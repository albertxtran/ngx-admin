import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { Top100Component } from './top100.component';

const routes: Routes = [
  {
    path: ':listName',
    component: Top100Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top100RoutingModule { }

export const routedComponents = [
  Top100Component
];