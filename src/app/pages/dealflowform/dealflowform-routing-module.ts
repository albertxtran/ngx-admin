import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { DealflowFormComponent } from './dealflowform.component';

const routes: Routes = [
  {
    path: '',
    component: DealflowFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealflowPageRoutingModule { }

export const routedComponents = [
  DealflowFormComponent
];