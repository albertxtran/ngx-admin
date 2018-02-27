import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Login } from './login.component';

import { LoginService } from './login.service';
import { ThemeModule } from '../../@theme/theme.module';
import { LoginRoutingModule, routedComponents } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../authentication.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [
    AuthenticationService,
    LoginService,
    HttpClientModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class LoginModule {}

