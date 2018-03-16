import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { ConfirmDealflowComponent } from './confirmdealflow.component';
import { ConfirmDealflowService } from './confirmdealflow.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfirmDealflowRoutingModule, routedComponents } from './confirmdealflow-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../../@auth/authentication.service';


@NgModule({
  imports: [
    ThemeModule,
    ConfirmDealflowRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    HttpModule,
  ],
  declarations: [
    ...routedComponents,
    ConfirmDealflowComponent,
  ],
  providers: [
    ConfirmDealflowService,
    ToasterService,
    AuthenticationService,
  ],

})
export class ConfirmDealflowModule {}