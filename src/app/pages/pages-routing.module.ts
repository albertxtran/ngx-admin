import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartupsComponent } from './startups/startups.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },{
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },{
    path: 'startups',
    loadChildren: './startups/startups.module#StartupsModule',
  },{
    path: 'company',
    loadChildren: './company/company.module#CompanyModule',
  },{
    path: 'corporations',
    loadChildren: './corporations/corporations.module#CorporationsModule',
  },{
    path: 'corporation',
    loadChildren: './corporation/corporation.module#CorporationModule',
  },{
    path: 'portfolio',
    loadChildren: './portfolio/portfolio.module#PortfolioModule',
  },{
    path: 'dealflowpage',
    loadChildren: './dealflowpage/dealflowpage.module#DealflowPageModule',
  },{
    path: 'editdealflow',
    loadChildren: './editdealflow/editdealflow.module#EditDealflowModule',
  },{
    path: 'editcompany',
    loadChildren: './editcompany/editcompany.module#EditCompanyModule',
  },{
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  constructor(){

  }
}
