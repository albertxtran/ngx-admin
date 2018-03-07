import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { EditCompanyComponent } from './editcompany.component';
import { EditCompanyService } from './editcompany.service';
import { EditCompanyRoutingModule, routedComponents } from './editcompany-routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    FileUploadModule,
    EditCompanyRoutingModule,
  ],
  declarations: [
    EditCompanyComponent,
    ...routedComponents,
  ],
  providers: [
    EditCompanyService,
    ToasterService
  ],

})
export class EditCompanyModule {}