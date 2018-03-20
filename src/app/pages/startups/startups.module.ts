import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { StartupsService } from './startups.service';
import { ThemeModule } from '../../@theme/theme.module';
import { StartupsRoutingModule, routedComponents } from './startups-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './custom.modal';
import { FilterModal } from './filter-modal/filter-modal.component';
import { ConfirmModal } from './confirm.modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    BootstrapModalModule,
    ReactiveFormsModule,
    StartupsRoutingModule
    
  ],
  entryComponents: [
    ModalComponent,
    FilterModal,
    ConfirmModal
  ],
  declarations: [
    ...routedComponents,
    ModalComponent,
    FilterModal,
    ConfirmModal
  ],
  providers: [
    StartupsService,
    ToasterService
  ]

})
export class StartupsModule {}