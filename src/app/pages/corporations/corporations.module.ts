import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { CorporationsService } from './corporations.service';
import { ThemeModule } from '../../@theme/theme.module';
import { CorporationsRoutingModule, routedComponents } from './corporations-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalComponent } from './custom.modal';
import { FilterModal } from './filter.modal';
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
    CorporationsRoutingModule
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
    CorporationsService,
    ToasterService
  ]

})
export class CorporationsModule {}