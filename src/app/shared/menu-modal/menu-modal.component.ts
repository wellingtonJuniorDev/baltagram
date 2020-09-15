import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html'
})
export class MenuModalComponent {

  constructor(public utilService: UtilService) { }
}
