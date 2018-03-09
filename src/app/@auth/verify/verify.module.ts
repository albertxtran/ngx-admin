import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Verify } from './verify.component';

import { VerifyService } from './verify.service';
import { ThemeModule } from '../../@theme/theme.module';
import { VerifyRoutingModule, routedComponents } from './verify-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ThemeModule, 
    VerifyRoutingModule, 
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    Verify,
    ...routedComponents,
  ],
  providers: [
    VerifyService,
    ToasterService, 
  ],
})
export class VerifyModule {}
