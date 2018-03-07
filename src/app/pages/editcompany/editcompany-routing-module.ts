import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { EditCompanyComponent } from './editcompany.component';

const routes: Routes = [
  {
    path: ':id',
    component: EditCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCompanyRoutingModule { }

export const routedComponents = [
  EditCompanyComponent
];