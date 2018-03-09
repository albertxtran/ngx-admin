import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { Verify } from './verify.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: ':api_key',
    component: Verify
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyRoutingModule { }

export const routedComponents = [
  Verify
];