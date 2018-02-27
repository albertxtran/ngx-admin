import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Forgotpass } from './forgotpass.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ForgotpassRoutingModule, routedComponents } from './forgotpass-routing.module';

import { ForgotpassService } from './forgotpass.service';
import { ToasterService } from '../../@theme/providers/toaster.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ForgotpassRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    ForgotpassService,
    ToasterService
  ],
})
export class ForgotpassModule {}
