import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { CorporationsComponent } from './corporations.component';

const routes: Routes = [
  {
    path: '',
    component: CorporationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporationsRoutingModule { }

export const routedComponents = [
  CorporationsComponent
];