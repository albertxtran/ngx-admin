import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { FileUploadModule } from 'ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';

import { EditDealflowComponent } from './editdealflow.component';
import { EditDealflowService } from './editdealflow.service';

import { EditDealflowRoutingModule, routedComponents } from './editdealflow-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';
import { AttendeeComponent } from './attendee.component';
import { SupportingMemberComponent } from './supportingMember.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EditDealflowRoutingModule,
    ThemeModule,
    CommonModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [
    EditDealflowComponent,
    ...routedComponents, 
    AttendeeComponent, 
    SupportingMemberComponent
  ],
  providers: [
    EditDealflowService,
    ToasterService
  ],
})
export class EditDealflowModule {}