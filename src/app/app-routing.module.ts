import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePage } from './home/home.page';
import { PhotosComponent } from './photos/photos.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomePage,
    children: [
      { path: 'photos', component: PhotosComponent },
      { path: 'profile', component: ProfileComponent },

      {
        path: '',
        redirectTo: 'photos',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      useHash: true,
      preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
