import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  currentUser: any;
  ventureCount: any;
  dealFlowCount: any;
  top100Count: any;
  top20Count: any;

  constructor(private _dashboardService: DashboardService){
    this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
    this.getVentureCount();
    this.getDealFlowCount();
    this.getTop100Count();
    this.getTop20Count();


  }

  getVentureCount() {
    this._dashboardService.getVentureCount().map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      //this.loading = false;
      //this.error = true;
      console.log("Search did not return any results.") 
    } else if (res.status < 200 || res.status >= 300){
      //this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      //this.loading = false;
      return res.json();
    }
  }).subscribe(data => this.ventureCount = data,
    err => console.error('Error: ' + err),
        () => {}
    )
  };

  getDealFlowCount() {
    this._dashboardService.getDealFlowCount().map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      //this.loading = false;
      //this.error = true;
      console.log("Search did not return any results.") 
    } else if (res.status < 200 || res.status >= 300){
      //this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      //this.loading = false;
      return res.json();
    }
  }).subscribe(data => this.dealFlowCount = data,
    err => console.error('Error: ' + err),
        () => {}
    )
  };

  getTop100Count() {
    this._dashboardService.getTop100Count().map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      //this.loading = false;
      //this.error = true;
      console.log("Search did not return any results.") 
    } else if (res.status < 200 || res.status >= 300){
      //this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      //this.loading = false;
      return res.json();
    }
  }).subscribe(data => this.top100Count = data,
    err => console.error('Error: ' + err),
        () => {}
    )
  };

  getTop20Count() {
    this._dashboardService.getTop20Count().map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status == 204) {
      //this.loading = false;
      //this.error = true;
      console.log("Search did not return any results.") 
    } else if (res.status < 200 || res.status >= 300){
      //this.loading = false;
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      //this.loading = false;
      return res.json();
    }
  }).subscribe(data => this.top20Count = data,
    err => console.error('Error: ' + err),
        () => {}
    )
  };
}
