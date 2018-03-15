import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { FileUploadModule } from 'ng2-file-upload';
import {MatSelectModule} from '@angular/material/select';
//import { FileSelectDirective } from 'ng2-file-upload';

import { EditDealflowComponent } from './editdealflow.component';
import { EditDealflowService } from './editdealflow.service';

import { EditDealflowRoutingModule, routedComponents } from './editdealflow-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';
import { AttendeeComponent } from './attendee.component';
import { SupportingMemberComponent } from './supportingMember.component';
import {AgendaComponent} from './agenda.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EditDealflowRoutingModule,
    ThemeModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    MatSelectModule,
  ],
  declarations: [
    EditDealflowComponent,
    ...routedComponents, 
    AttendeeComponent, 
    SupportingMemberComponent,
    AgendaComponent,
  ],
  providers: [
    EditDealflowService,
    ToasterService
  ],
})
export class EditDealflowModule {}