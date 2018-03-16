import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { ConfirmDealflowComponent } from './confirmdealflow.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmDealflowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmDealflowRoutingModule { }

export const routedComponents = [
  ConfirmDealflowComponent
];