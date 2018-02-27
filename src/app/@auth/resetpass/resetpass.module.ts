import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { ResetpassRoutingModule, routedComponents } from './resetpass-routing.module';

import { ResetpassService } from './resetpass.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ResetpassRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ResetpassService,
  ],
})
export class ResetpassModule {}
