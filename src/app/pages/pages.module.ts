import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dash/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { AdminGuard } from './_routes/admin-guard.service';
import { GuardService } from './_routes/guard.service';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [ 
    GuardService,
    AdminGuard 
  ], 
})
export class PagesModule {
}
