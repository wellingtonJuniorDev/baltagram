import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private loader: HTMLIonLoadingElement;

  constructor(private afAuth: AngularFireAuth,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController ) { }

  redirectIfLogged = (route: string = 'login') => {
    this.afAuth.authState.subscribe(user => {
      if(user) this.navCtrl.navigateRoot('home')

      else this.navCtrl.navigateRoot(route);
    })
  }

  createAlert = (message: string, buttons: string[] = ['OK']) => {
    this.alertCtrl.create({ message, buttons })
    .then(res => res.present())
  }

  modalDissmiss = () => this.modalCtrl.dismiss();

  loadingOn = (message: string = "Carregando...") => {    
    this.loadingCtrl.create({ message })
    .then(res => {
      this.loader = res;
      this.loader.present()
    });
  }

  loadingOff = () => this.loader?.dismiss();

  createToast = (message: string, duration: number = 2000) => {
    this.toastCtrl.create({
      message, duration
    })
    .then(res => res.present());
  }

  photoFilters: string[] = [
    "original",
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "clarendon",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "maven",
    "moon",
    "nashville",
    "perpetua",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "xpro2"
  ]
}
