import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CorporationService } from './corporation.service';
import { ThemeModule } from '../../@theme/theme.module';
import { CorporationRoutingModule, routedComponents } from './corporation-routing.module';
import { ToasterService } from '../../@theme/providers/toaster.service';


import { ChampionModal } from './champion-modal/champion-modal.component';
import { ManagerModal } from './manager-modal/manager-modal.component';


@NgModule({
  imports: [
    ThemeModule,
    CorporationRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    ChampionModal,
    ManagerModal
  ],
  providers: [
    CorporationService,
    ToasterService
  ],
  entryComponents: [
    ChampionModal,
    ManagerModal
  ],

})
export class CorporationModule {}