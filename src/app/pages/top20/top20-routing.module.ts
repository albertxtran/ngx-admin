import { NgModule } from '@angular/core';

import { Routes, RouterModule }  from '@angular/router';
import { Top20Component } from './top20.component';

const routes: Routes = [
  {
    path: ':listName',
    component: Top20Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top20RoutingModule { }

export const routedComponents = [
  Top20Component
];