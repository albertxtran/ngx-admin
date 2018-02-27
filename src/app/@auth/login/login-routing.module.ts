import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { Login } from './login.component';


const routes: Routes = [
  {
    path: '',
    component: Login
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }

export const routedComponents = [
  Login
];