import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Top100Component, SearchPipe, PipeFilter, SearchArrayPipe } from './top100.component';
import { Top100Service } from './top100.service';
import { ThemeModule } from '../../@theme/theme.module';
import { Top100RoutingModule, routedComponents } from './top100-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './export.modal';

@NgModule({
  imports: [
    ThemeModule, 
    Top100RoutingModule,
    CommonModule,
    FormsModule,
    BootstrapModalModule
  ],
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    ...routedComponents,
    Top100Component,
    SearchPipe,
    PipeFilter,
    SearchArrayPipe,
    ModalComponent
  ],
  providers: [
    ToasterService,
    Top100Service
  ],

})
export class Top100Module {}