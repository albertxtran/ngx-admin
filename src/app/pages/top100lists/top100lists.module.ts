import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from './confirm.modal';
import { ModalComponent } from './custom.modal';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { Top100ListsComponent, SearchArrayPipe } from './top100lists.component';
import { Top100ListsService } from './top100lists.service';
import { ThemeModule } from '../../@theme/theme.module';
import { Top100ListsRoutingModule, routedComponents } from './top100lists-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ThemeModule, 
    Top100ListsRoutingModule, 
    CommonModule,
    FormsModule,
    BootstrapModalModule,
  ],
  entryComponents: [
    ModalComponent,
    ConfirmModal
  ],
  declarations: [
    ...routedComponents,
    Top100ListsComponent,
    SearchArrayPipe,
    ConfirmModal,
    ModalComponent,
  ],
  providers: [
    ToasterService,
    Top100ListsService
  ],

})
export class Top100ListsModule {}