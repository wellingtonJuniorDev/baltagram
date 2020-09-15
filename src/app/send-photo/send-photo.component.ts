import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, NavParams, ToastController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { defaultValidators } from '../signup/signup.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-send-photo',
  templateUrl: './send-photo.component.html',
  styleUrls: ['./send-photo.component.scss']
})
export class SendPhotoComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public location: string = '';
  public photo: string;
  public filter: string = "original";
  public user: string;
  public form: FormGroup;
  public photos: AngularFireList<any>;

  constructor(
    public utilService: UtilService,
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.photo = this.navParams.get('photo');

    this.photos = this.database.list('/photos');
    this.afAuth.authState.subscribe(user => {
      if (user) this.user = user.email;
    })
  }

  ngOnInit() { this.createForm() }

  changeFilter = () => {
    this.slides.getActiveIndex()
      .then(currentIndex => {
        this.filter = this.utilService.photoFilters[currentIndex]
      });
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation
        .getCurrentPosition((position: Position) => {
          this.location = `${position.coords.latitude},${position.coords.longitude}`;
        }),
        error => this.utilService.createAlert('Não foi possível obter sua localização.')
    }
  }

  createForm = () => {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose(defaultValidators)],
      message: ['', Validators.compose(defaultValidators)]
    })
  }

  submit = () => {
    if (!navigator.onLine) {
      this.saveDataInLocalStorate();
      return;
    }

    this.postDataToServer(this.getSubmitData());
  }

  getSubmitData = () => {
    return {
      user: this.user,
      image: this.photo,
      filter: this.filter,
      location: this.location,
      title: this.form.value.title,
      message: this.form.value.message,
      date: firebase.database.ServerValue.TIMESTAMP
    }
  }

  postDataToServer = (photo: any) => {
    this.utilService.loadingOn();

    this.photos.push(photo)
    .then(() => {
      this.utilService.loadingOff();
      this.utilService.modalDissmiss();
      this.navCtrl.navigateRoot('home')
    })
    .catch(err => {
      this.utilService.loadingOff();
      this.utilService.createAlert('Não foi possível enviar sua imagem.')
    })
  }

  saveDataInLocalStorate = () => {
    let data = JSON.parse(localStorage.getItem('photos'));

    if (!data) data = [];
    data.push(this.getSubmitData());
    localStorage.setItem('photos', JSON.stringify(data));

    this.utilService.createToast('Imagem salva para ser enviada depois.');
    this.utilService.modalDissmiss();
  }

}
