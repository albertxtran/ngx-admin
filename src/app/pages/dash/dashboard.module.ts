import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    ...routedComponents,
  ],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}
