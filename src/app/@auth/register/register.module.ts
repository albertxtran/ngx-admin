import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';


import { Register } from './register.component';
import { RegisterRoutingModule, routedComponents } from './register-routing.module';

import { RegisterService } from './register.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    RegisterService
  ],
})
export class RegisterModule {}
