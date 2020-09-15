import { Component, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { SendPhotoComponent } from '../send-photo/send-photo.component';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html'
})
export class TakePictureComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              public utilService: UtilService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    const video = <HTMLVideoElement>document.getElementById('video');
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: false})
      .then((stream) => {
        video.srcObject = stream
        video.play();        
      })
    }
  }

  takePicture() {
    const video = <HTMLVideoElement>document.getElementById('video');
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.drawImage(video, 0,0, 320,240);
    video.classList.add('animated', 'flash');

    setTimeout(() => {
      this.utilService.modalDissmiss();

      const modal = this.modalCtrl.create({ 
        component: SendPhotoComponent, 
        componentProps: { photo: canvas.toDataURL()  }
       })
      modal.then(res => res.present());
    },800)    
  }
}
