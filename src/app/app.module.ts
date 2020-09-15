import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';
import { PhotosComponent } from './photos/photos.component';
import { TakePictureComponent } from './take-picture/take-picture.component';
import { SendPhotoComponent } from './send-photo/send-photo.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { MenuModalComponent } from './shared/menu-modal/menu-modal.component';
import { ShowMapComponent } from './show-map/show-map.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    MenuModalComponent,
    LoginComponent,
    PhotosComponent,
    ProfileComponent,
    SendPhotoComponent,
    SignupComponent,
    ShowMapComponent,
    TakePictureComponent
  ],
  entryComponents: [],
  imports: [
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    BrowserModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    IonicModule.forRoot(), 
    ReactiveFormsModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('OneSignalSDKWorker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('OneSignalSDKUpdaterWorker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
