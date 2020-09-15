import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { defaultValidators } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private utilService: UtilService) { }

  ngOnInit() { 
    this.utilService.redirectIfLogged();
    this.createForm();
   }
  
  goToSignUp = () => this.navCtrl.navigateRoot('signup');

  submit() {
    this.utilService.loadingOn();
    const data = this.form.value;

    this.afAuth.signInWithEmailAndPassword(data.email, data.password)
    .then(res => { console.log(res);
      this.utilService.loadingOff();
      this.navCtrl.navigateRoot('home');
    })
    .catch(err => {
      this.utilService.loadingOff();
      this.utilService.createAlert('Email ou Senha incorretos.');
    })
  }

  createForm = () => {  
    this.form = this.formBuilder.group({
      email: ['', Validators.compose(defaultValidators)],
      password: ['', Validators.compose(defaultValidators)]
    })
  }
}
