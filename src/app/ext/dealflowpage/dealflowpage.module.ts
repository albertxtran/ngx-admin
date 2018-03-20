import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DealflowPageComponent } from './dealflowpage.component';
import { DealflowPageService } from './dealflowpage.service';
import { ThemeModule } from '../../@theme/theme.module';
import { DealflowPageRoutingModule, routedComponents } from './dealflowpage-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../../@auth/authentication.service';


@NgModule({
  imports: [
    ThemeModule,
    DealflowPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    ...routedComponents,
    DealflowPageComponent,
  ],
  providers: [
    DealflowPageService,
    ToasterService,
    AuthenticationService,
  ],

})
export class DealflowPageModule {}