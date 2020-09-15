import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html'
})
export class ShowMapComponent implements OnInit {
  public location: string;
  public iframeHtml: SafeHtml;

  constructor(private navParams: NavParams,
              private sanitizer: DomSanitizer,
              public utilService: UtilService) { 
    this.location = this.navParams.get('location');
    this.utilService.loadingOn();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadEmbedMap();

    setTimeout(() => { this.utilService.loadingOff() }, 1200);   
  }

  loadEmbedMap = () => {
    const sourceUrl = `https://www.google.com/maps/embed/v1/place?key=${environment.mapsApiKey}&q=${this.location}`;
    const iframe = `<iframe style="height: 90vh;border:0;" width="100%" height="99%" frameborder="0" src="${sourceUrl}" allowfullscreen></iframe>`;      
    this.iframeHtml = this.sanitizer.bypassSecurityTrustHtml(iframe);  
  }
}
