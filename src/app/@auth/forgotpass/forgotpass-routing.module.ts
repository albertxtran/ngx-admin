import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { Forgotpass } from './forgotpass.component';

const routes: Routes = [
  {
    path: '',
    component: Forgotpass
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotpassRoutingModule { }

export const routedComponents = [
  Forgotpass
];