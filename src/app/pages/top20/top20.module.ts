import { ThemeModule } from '../../@theme/theme.module';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Top20Component, SearchArrayPipe } from './top20.component';
import { Top20Service } from './top20.service';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './export.modal';
import { CorpModalComponent } from './corp.modal';
import { DealflowModalComponent } from './dealflow.modal';
import { Top20RoutingModule, routedComponents } from './top20-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    BootstrapModalModule,
    Top20RoutingModule
  ],
  entryComponents: [
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  declarations: [
    ...routedComponents,
    Top20Component,
    SearchArrayPipe,
    ModalComponent,
    CorpModalComponent,
    DealflowModalComponent
  ],
  providers: [
    Top20Service
  ],

})
export class Top20Module {}