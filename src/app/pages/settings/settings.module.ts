import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';
import { SettingsRoutingModule, routedComponents } from './settings-routing.module';
import { SettingsService } from './settings.service';
import { ToasterService } from '../../@theme/providers/toaster.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SettingsRoutingModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    SettingsService,
    ToasterService
  ],

})
export class SettingsModule {}