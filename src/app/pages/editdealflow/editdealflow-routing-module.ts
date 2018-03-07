import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { EditDealflowComponent } from './editdealflow.component';

const routes: Routes = [
  {
    path: '',
    component: EditDealflowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDealflowRoutingModule { }

export const routedComponents = [
  EditDealflowComponent
];