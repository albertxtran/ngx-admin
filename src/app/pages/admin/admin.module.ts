import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'; 

import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule, routedComponents } from './admin-routing.module';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FilterModal } from './filter.modal';
import { ConfirmModal } from './confirm.modal';
import { EditModal } from './edit.modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    BootstrapModalModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    HttpModule,
  ],
  entryComponents: [
    FilterModal,
    ConfirmModal,
    EditModal,    
  ],
  declarations: [
    ...routedComponents,
    FilterModal,
    ConfirmModal,
    EditModal
  ],
  //bootstrap:[ AdminComponent ],
  providers: [
    AdminService,
    ToasterService,
    HttpClientModule
  ],

})
export class AdminModule {}