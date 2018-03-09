import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { Top100ListsComponent } from './top100lists.component';

const routes: Routes = [
  {
    path: '',
    component: Top100ListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top100ListsRoutingModule { }

export const routedComponents = [
  Top100ListsComponent
];