import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FeedbackComponent } from './feedback.component';
import { FeedbackService } from './feedback.service';
import { ThemeModule } from '../../@theme/theme.module';
import { FeedbackRoutingModule, routedComponents } from './feedback-routing-module'
import { ToasterService } from '../../@theme/providers/toaster.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatButtonModule, MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from '../../@auth/authentication.service';


@NgModule({
  imports: [
    ThemeModule,
    FeedbackRoutingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    HttpModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
  ],
  declarations: [
    ...routedComponents,
    FeedbackComponent,
  ],
  providers: [
    FeedbackService,
    ToasterService,
    AuthenticationService,
  ],

})
export class FeedbackModule {}