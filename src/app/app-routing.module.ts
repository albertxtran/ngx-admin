import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth-guard.service';

import {
  NbAuthComponent,
  //NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


const routes: Routes = [
  { 
    path: 'pages', 
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: 'app/pages/pages.module#PagesModule' 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/@auth/login/login.module#LoginModule',
      },
      {
        path: 'login',
        loadChildren: 'app/@auth/login/login.module#LoginModule',
      },
      {
        path: 'register',
        loadChildren: 'app/@auth/register/register.module#RegisterModule',
      },
      {
        path: 'forgotpass',
        loadChildren: 'app/@auth/forgotpass/forgotpass.module#ForgotpassModule',
      },
      {
        path: 'resetpass',
        loadChildren: 'app/@auth/resetpass/resetpass.module#ResetpassModule',
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
