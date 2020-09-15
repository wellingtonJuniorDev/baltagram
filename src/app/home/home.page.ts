import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { TakePictureComponent } from '../take-picture/take-picture.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  constructor(
    private modalCtrl: ModalController,
    private utilService: UtilService) {
      this.utilService.redirectIfLogged()
  }

  showSendPhoto() {
    const modal = this.modalCtrl.create({ component: TakePictureComponent });
  
    modal.then(res => res.present());
  }
}
