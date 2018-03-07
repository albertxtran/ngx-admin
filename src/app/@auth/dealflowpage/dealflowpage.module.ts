import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DealflowPageComponent } from './dealflowpage.component';
import { DealflowPageService } from './dealflowpage.service';
import { ThemeModule } from '../../@theme/theme.module';
import { DealflowPageRoutingModule, routedComponents } from './dealflowpage-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../authentication.service';


@NgModule({
  imports: [
    ThemeModule,
    DealflowPageRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    HttpModule,
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