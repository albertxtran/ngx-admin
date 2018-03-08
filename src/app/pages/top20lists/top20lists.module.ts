import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from './confirm.modal';
import { ModalComponent } from './custom.modal';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { Top20ListsComponent, SearchArrayPipe } from './top20lists.component';
import { Top20ListsService } from './top20lists.service';

import { ThemeModule } from '../../@theme/theme.module';
import { Top20ListsRoutingModule, routedComponents } from './top20lists-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';

@NgModule({
  imports: [
    ThemeModule,
    Top20ListsRoutingModule,
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
    Top20ListsComponent,
    SearchArrayPipe,
    ConfirmModal,
    ModalComponent,
    routedComponents
  ],
  providers: [
    Top20ListsService,
    ToasterService
  ],

})
export class Top20ListsModule {}