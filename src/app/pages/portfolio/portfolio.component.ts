import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { PortfolioService } from './portfolio.service';
import {Subscription} from 'rxjs';
//import {BaThemePreloader} from '../../theme/services';

import * as CryptoJS from 'crypto-js';
//import { BaMenuService } from '../../theme';
import { Router } from '@angular/router';


@Component({
  selector: 'portfolio',
  styleUrls: ['./portfolio.scss'],
  templateUrl: './portfolio.html',
})
export class PortfolioComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  companies: any[];
  public error: boolean;
  public loading: boolean;
  role: Observable<any>;
  currentUser: any;

  constructor(private _portfolioService: PortfolioService, private router: Router) { // private _menuService: BaMenuService
    this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
    //this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
    //this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));
    this.role = this.currentUser.role;
    this.getPortfolioList();
  }

    ngOnInit(){
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();
    }

    getPortfolioList() {
      this.loading = true;
      this.error = false;
      this._portfolioService.getVentures().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.error = true;
        console.log("Search did not return any results.") 
      } else if (res.status < 200 || res.status >= 300){
        this.loading = false;
        throw new Error('This request has failed ' + res.status);
      }
      // If everything went fine, return the response
      else {
        this.loading = false;
        return res.json();
      }
    }).subscribe(data => this.companies = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }

/*    private _loadData(_startupService):Promise<any> {
    return new Promise((resolve, reject) => {
      _startupService.getVentures().subscribe(data => this.companies = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    )
    });
  }*/

}

    

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}

@Pipe({
    name: 'searchFilter'
})

export class PipeFilter implements PipeTransform {
    transform(items: any[], term: any[]): any {
        return items.filter(item => item.companyName.indexOf(term[0]) !== -1);
    }
}   

@Pipe({
	name: "smArraySearch"
})
export class SearchArrayPipe implements PipeTransform {
	transform(list: Array<{}>, search: string): Array<{}> {
		if (!list || !search) {
			return list;
		}

		//return list.filter((item: { companyName: string}) => !!item.companyName.toLowerCase().match(new RegExp(search.toLowerCase()) ));
    return list.filter((item: { companyName: string, blurb: string, verticals: string, website: string, pnpContact: string, contactName: string, email: string, stage: string, b2bb2c: string, location: string, city: string, tags: string}) => 
    (!!(''+item.companyName).toLowerCase().match(new RegExp(search.toLowerCase()))) || 
    (!!(''+item.blurb).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.verticals).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.website).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.pnpContact).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.contactName).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.email).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.stage).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.b2bb2c).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.location).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.city).toLowerCase().match(new RegExp(search.toLowerCase()))) ||
    (!!(''+item.tags).toLowerCase().match(new RegExp(search.toLowerCase())))
    );
    
	}
}