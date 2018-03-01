import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  currentUser: any;

  userMenu: any; // = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
    
    this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
    
    if(this.currentUser.role == 'admin'){
      this.userMenu = [{ title: 'Settings', link: '/pages/settings' }, { title: 'Admin', link: '/pages/admin' }, { title: 'Log out', link: '/auth/login', fragment: 'logout' }];
    }else if(this.currentUser.role == 'startup'){
      this.userMenu = [{ title: 'Profile', link: '/pages/company/'+this.currentUser.ref_id+'' }, { title: 'Settings', link: '/pages/settings' }, { title: 'Log out', link: '/auth/login', fragment: 'logout' }];
    } else {
      this.userMenu = [{ title: 'Settings', link: '/pages/settings' },{ title: 'Log out', link: '/auth/login', fragment: 'logout'}];
    }
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
