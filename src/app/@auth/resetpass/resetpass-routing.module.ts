import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Resetpass } from './resetpass.component';

const routes: Routes = [
  {
    path: ':api_key',
    component: Resetpass,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpassRoutingModule { }

export const routedComponents = [
  Resetpass,
];
