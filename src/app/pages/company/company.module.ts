import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { ThemeModule } from '../../@theme/theme.module';
import { CompanyRoutingModule, routedComponents } from './company-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ThemeModule,
    CompanyRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    CompanyService,
    ToasterService
  ],

})
export class CompanyModule {}