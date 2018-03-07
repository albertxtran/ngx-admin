import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { MENU_ITEMS } from './pages-menu';
import { ADMIN_ITEMS } from './_menu/admin-menu';
import { STARTUPS_ITEMS } from './_menu/startups-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;

   constructor(){
    var currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));    
    if(currentUser.role =="admin"){
    this.menu = ADMIN_ITEMS;
    }else if(currentUser.role == "startups"){
      this.menu = STARTUPS_ITEMS;
    }
  } 
}
