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
import {AgendaComponent} from './agenda.component';
import { ToasterService } from '../../@theme/providers/toaster.service';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    ThemeModule,
    DealflowPageRoutingModule,
    MatSelectModule,
  ],
  declarations: [
    DealflowFormComponent, AttendeeComponent, SupportingMemberComponent, AgendaComponent, ...routedComponents,
  ],
  providers: [
    DealflowFormService,
    ToasterService,
  ],
})
export class DealflowFormModule {}