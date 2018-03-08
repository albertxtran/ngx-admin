import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { EditCorporationComponent } from './editcorporation.component';

const routes: Routes = [
  {
    path: ':id',
    component: EditCorporationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCorporationRoutingModule { }

export const routedComponents = [
  EditCorporationComponent
];