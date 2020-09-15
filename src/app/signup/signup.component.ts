import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../services/util.service';

export const defaultValidators = [
  Validators.minLength(5),
  Validators.maxLength(160),
  Validators.required
];

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public loader: HTMLIonLoadingElement;

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private utilService: UtilService) { 
              }

  ngOnInit() { 
    this.utilService.redirectIfLogged('signup');
    this.createForm() 
  }

  goToLogin = () => this.navCtrl.navigateRoot('login');

  submit() {
    this.utilService.loadingOn();
    const data = this.form.value;

    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
    .then(res => { console.log(res);
      this.utilService.loadingOff();
      this.navCtrl.navigateRoot('home');
    })
    .catch(err => {
      this.utilService.loadingOff();
      this.utilService.createAlert('Não foi possível realizar seu cadastro.');
    })
  }

  createForm = () => {  
    this.form = this.formBuilder.group({
      email: ['', Validators.compose(defaultValidators)],
      password: ['', Validators.compose(defaultValidators)]
    })
  }
}
