import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { Top20ListsComponent } from './top20lists.component';

const routes: Routes = [
  {
    path: '',
    component: Top20ListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top20ListsRoutingModule { }

export const routedComponents = [
  Top20ListsComponent
];