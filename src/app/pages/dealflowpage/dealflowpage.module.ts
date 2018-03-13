import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { DealflowPageComponent } from './dealflowpage.component';
import { DealflowPageService } from './dealflowpage.service';
import { ThemeModule } from '../../@theme/theme.module';
import { DealflowPageRoutingModule, routedComponents } from './dealflowpage-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';


@NgModule({
  imports: [
    ThemeModule,
    DealflowPageRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  declarations: [
    ...routedComponents,
    DealflowPageComponent,
  ],
  providers: [
    DealflowPageService,
    ToasterService,
  ],

})
export class DealflowPageModule {}