import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { ShowMapComponent } from '../show-map/show-map.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent implements OnInit {
  public photos: any[];
  constructor(
    private database: AngularFireDatabase,
    private modalCtrl: ModalController,
    private utilService: UtilService) {    
      this.getPhotos();   
  }

  ngOnInit() {}

  getPhotos = () => {
    this.utilService.loadingOn();
    this.database.list('/photos')
    .valueChanges()
    .subscribe(res => {
      this.utilService.loadingOff();
      this.photos = res.reverse();
    }, 
    error => {
      this.utilService.loadingOff();
      this.utilService.createAlert('Houve algum erro na conexão com o serviço.')
    })
  }

  showMap = (location: string) => {
    this.modalCtrl.create({
      component: ShowMapComponent,
      componentProps: { location }
    })
    .then(res => res.present());
  }
}
