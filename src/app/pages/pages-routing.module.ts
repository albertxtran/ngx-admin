import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartupsComponent } from './startups/startups.component';
import * as CryptoJS from 'crypto-js';
import { AdminGuard } from './_routes/admin-guard.service'


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
    canActivate: [AdminGuard],
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
    path: 'dealflowlists',
    loadChildren: './dealflowlists/dealflowlists.module#DealflowListsModule',
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
    path: 'editcorporation',
    loadChildren: './editcorporation/editcorporation.module#EditCorporationModule',
  },{
    path: 'top20lists',
    loadChildren: './top20lists/top20lists.module#Top20ListsModule',
  },{
    path: 'top20',
    loadChildren: './top20/top20.module#Top20Module',
  },{
    path: 'top100lists',
    loadChildren: './top100lists/top100lists.module#Top100ListsModule',
  },{
    path: 'top100',
    loadChildren: './top100/top100.module#Top100Module',
  },{
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
  /* constructor(router: Router){
    var currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
    if(currentUser.role =="admin"){
      RouterModule.forChild([{
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
          path: 'corporations',
          loadChildren: './corporations/corporations.module#CorporationsModule',
        },{
          path: 'corporation',
          loadChildren: './corporation/corporation.module#CorporationModule',
        },{
          path: 'portfolio',
          loadChildren: './portfolio/portfolio.module#PortfolioModule',
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
      }]);
    }
  } */
}
