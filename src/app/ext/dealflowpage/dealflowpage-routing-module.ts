import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { DealflowPageComponent } from './dealflowpage.component';

const routes: Routes = [
  {
    path: '',
    component: DealflowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealflowPageRoutingModule { }

export const routedComponents = [
  DealflowPageComponent
];