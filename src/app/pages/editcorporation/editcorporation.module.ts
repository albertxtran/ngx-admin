import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { EditCorporationComponent } from './editcorporation.component';
import { EditCorporationService } from './editcorporation.service';
import { EditCorporationRoutingModule, routedComponents } from './editcorporation-routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    ThemeModule,
    EditCorporationRoutingModule,
  ],
  declarations: [
    EditCorporationComponent,
    ...routedComponents,
  ],
  providers: [
    EditCorporationService,
    ToasterService,
  ],

})
export class EditCorporationModule {}