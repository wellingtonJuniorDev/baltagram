import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: string;

  constructor(private afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private utilService: UtilService) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.user = user.email
    })
   }

  ngOnInit() { }

  submit() {
    this.utilService.loadingOn();
    this.afAuth.signOut()
    .then(this.logout)
    .catch(this.logout)    
  }

  logout = (result: any) => {
    this.utilService.loadingOff();
    this.navCtrl.navigateRoot('login');
  }
}
