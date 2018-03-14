import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DealflowListsComponent, SearchArrayPipe } from './dealflowlists.component';
import { DealflowListsService } from './dealflowlists.service';
import { ThemeModule } from '../../@theme/theme.module';
import { DealflowListsRoutingModule, routedComponents } from './dealflowlists-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    ThemeModule,
    BootstrapModalModule,
    DealflowListsRoutingModule
  ],
  declarations: [
    ...routedComponents,
    SearchArrayPipe,
    DealflowListsComponent,
    routedComponents,
  ],
  providers: [
    DealflowListsService,
    ToasterService
  ],

})
export class DealflowListsModule {}