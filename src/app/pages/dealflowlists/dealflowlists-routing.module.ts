import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { DealflowListsComponent } from './dealflowlists.component';

const routes: Routes = [
  {
    path: '',
    component: DealflowListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealflowListsRoutingModule { }

export const routedComponents = [
  DealflowListsComponent
];
