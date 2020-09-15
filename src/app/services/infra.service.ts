import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class InfraService {
  public photos: AngularFireList<any>;
  
  constructor(
    private utilService: UtilService,
    private database: AngularFireDatabase) {
      this.photos = this.database.list('/photos');
    }

  checkInternetConnection = () => {
    window.addEventListener('online', this.isOnline);
    window.addEventListener('offline', this.isOnline);
  }

  loadOneSignal = () => {
    if (location.protocol.includes('https')) { 

      const OneSignal = (window as any).OneSignal  || [];
      OneSignal.push(function() {
        OneSignal.init({
          appId: environment.oneSignalApi,
          notifyButton: {
            enable: true,
          },
        });
        OneSignal.showNativePrompt();
      });
    }
  }

  requireNotification = () => {
    document.addEventListener('DOMContentLoaded', () => {
      if(!Notification) {
        alert('Este browser não suporta notificações');
        return;
      }

      if(Notification.permission !== 'granted') {
        Notification.requestPermission();
      } 
    });
  }

  isOnline = () => {
    if(navigator.onLine) {
      this.createNotification('Você está online!','Você está navegando online, conteúdo enviado para o servidor.');   
      this.submitOfflineDataToServer();
    }     
    else {
      this.createNotification('Você está offline!','Você está navegando offline, conteúdo enviado para o seu dispositivo.'); 
    }
  }

  createNotification = (title: string, message: string) => {
    return new Notification(title, {
      icon: 'assets/icons/icon-512x512.png',
      body: message,
      vibrate: [200,100,200,100,200,100,200]
    }); 
  }

  submitOfflineDataToServer = () => {
    let offlineData = JSON.parse(localStorage.getItem('photos'));
    if(!offlineData) return;

    this.postDataToServer(offlineData);    
  }

  postDataToServer = (photos: any) => {
    let itensProcessed: number = 0;

    photos.forEach((photo, index, array) => {
     
      this.photos.push(photo)
      .then(() => {
        itensProcessed++;
        this.removePhotosWhenFinished(itensProcessed, array.length);
      })
      .catch(err => {
        itensProcessed++;
        this.utilService.createAlert('Não foi possível enviar a imagem ', photo.title);
        this.removePhotosWhenFinished(itensProcessed, array.length);
      })     
    });
  }

  removePhotosWhenFinished = (itensProcessed:number, arrayLength:number) => {
    if(itensProcessed === arrayLength) {
      localStorage.removeItem('photos');
    }
  }
}
