import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { CorporationComponent } from './corporation.component';

const routes: Routes = [
  {
    path: ':id',
    component: CorporationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporationRoutingModule { }

export const routedComponents = [
  CorporationComponent
];