import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { FileUploadModule } from 'ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';

import { DealflowFormComponent } from './dealflowform.component';
import { DealflowFormService } from './dealflowform.service';
import { DealflowPageRoutingModule, routedComponents } from './dealflowform-routing-module'
import {AttendeeComponent} from './attendee.component';
import {SupportingMemberComponent} from './supportingMember.component';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    ThemeModule,
    DealflowPageRoutingModule,
  ],
  declarations: [
    DealflowFormComponent, AttendeeComponent, SupportingMemberComponent, ...routedComponents,
  ],
  providers: [
    DealflowFormService,
    ToasterService,
  ],
})
export class DealflowFormModule {}