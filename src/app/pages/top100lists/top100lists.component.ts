import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {Pipe, PipeTransform, SimpleChanges} from '@angular/core'
import { Observable } from 'rxjs/Rx';

import { Top100ListsService } from './top100lists.service';
import {Subscription} from 'rxjs';
import { ToasterService } from '../../@theme/providers/toaster.service';
import { ConfirmModal } from './confirm.modal';
import { DialogService } from "ng2-bootstrap-modal";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Component({
  selector: 'top100',
  styleUrls: ['./top100lists.scss'],
  templateUrl: './top100lists.html',
})
export class Top100ListsComponent implements OnInit {
  @ViewChild('input')
  input: ElementRef;
  @ViewChild('refresh') refresh: ElementRef;
  lists: any[] = [];
  archived: any[] = [];
  private sub: any;
  top100: Object;
  top100list: String;
  public error: boolean;
  public errorArchived: boolean;
  public loading: boolean;
  public overlay: any;
  currentUser: any;
  deleteon: boolean = false;
  
  constructor(private _top100Service: Top100ListsService, public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router, private dialogService:DialogService) {
    this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8)); 
    // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
    this.archived = new Array(0);
    this.lists  = new Array(0);
    this.unsetOverlay();
    this.getLists();
    this.getArchivedLists()
    this._toasterService.toastr.setRootViewContainerRef(vcr);  
    
  }

  ngOnInit(){
      console.log(JSON.stringify(this.currentUser));
      let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
      eventObservable.subscribe();  
  }

  deleteTop100List(top100list:any){
    let disposable = this.dialogService.addDialog(ConfirmModal, {
        list: top100list
        })
        .subscribe( isConfirmed =>{
            if(isConfirmed){
                var deleted;
                this._top100Service.deleteTop100List(this.currentUser.api_key, top100list.listName).map(res => {
                    // If request fails, throw an Error that will be caught
                    if(res.status == 204) {
                      this._toasterService.showError("Could not delete "+top100list.listName+", please try again.", "", 4000);  
                    } else if (res.status < 200 || res.status >= 300){
                      this._toasterService.showError("Could not delete "+top100list.listName+", please try again.", "", 4000);  
                      throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {
                      this._toasterService.showSuccess("Successfully deleted list '" +top100list.listName+"'", "Success!", 2000);
                        //remove element from asyncCompanies
                      
                      this.deleteon = true;
                      this.refresh.nativeElement.click();                        
                      return res.json();
                      
                    }
                  }).subscribe(data => deleted = data,
                    err => console.error('Error: ' + err),
                        () => console.log('')
                    );
            }
        });
    
  }

  getLists() {
      this.loading = true;
      this.error = false;
      this._top100Service.getTop100Lists().map(res => {
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
    }).subscribe(data => this.lists = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }

  getArchivedLists() {
      this.loading = true;
      this.errorArchived = false;
      this._top100Service.getTop100Archived().map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.loading = false;
        this.errorArchived = true;
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
    }).subscribe(data => this.archived = data,
      err => console.error('Error: ' + err),
          () => console.log('Completed!')
      )
  }

  refreshList() {
    if(this.deleteon == true){
      this.deleteon = false;
      this.getLists();
      this.getArchivedLists()
      //console.log("Getting page!!!")
      return null;
    }
  }

  addTop100List(listname: String){
    if(listname.length < 2 || listname.length > 50) {
      this._toasterService.showWarning("Please enter a list name greater than 1 and less than 50 characters.", "", 4000);
    } else {
      let item;
      this.loading = true;
      this._top100Service.addTop100List("{\"listName\":\""+listname+"\"}").subscribe(data => item = data,
    error => {this.loading = false; this._toasterService.showWarning("Please enter a new Top 100 List, '" +listname+ "' already exists!", "", 6000);},
      () => { 
        if(typeof this.lists == 'undefined'){
          this.lists = new Array(1);
          this.lists[0] = item;
          this.error = false;
          this.loading = false;
        }else{
          this.lists.push(item);
          this.loading = false;
        } 
      }      
    );
    }
  }


  archiveList(id:number) {
    this.setOverlay();
    this._top100Service.archiveList("{\"id\":"+id+"}").subscribe(data => this.top100 = data,
    error => {
      this.unsetOverlay();
      this._toasterService.showError("Could not archive list, please try again!", "Error", 4000)}, 
      () =>{
        
        for(var i = 0; i < this.lists.length; i++){
          
          if(this.lists[i].id == id){
            if(typeof this.archived == 'undefined'){
              this.archived = new Array(1);
              this.archived[0] = this.lists[i];
              this.errorArchived = false;
            }else{
              this.archived.push(this.lists[i])
            }
            this.lists.splice(i,1);
          }
          this.unsetOverlay();

        }
      }
    );
  }

  unarchiveList(id:number) {
    this.setOverlay();
    this._top100Service.unarchiveList("{\"id\":"+id+"}").subscribe(data => this.top100 = data,
    error => {
      this.unsetOverlay();
      this._toasterService.showError("Could not unarchive list, please try again!", "Error", 4000)}, 
      () =>{
        
        for(var i = 0; i < this.archived.length; i++){
          
          if(this.archived[i].id == id){
            this.lists.push(this.archived[i])
            this.archived.splice(i,1);
          }
          this.unsetOverlay();

        }
      }
    );
  }

  setOverlay(){
    this.overlay = {'background-color' : 'Black', 'opacity': '0.7', 'border-radius' : '7px'};
  }

  unsetOverlay(){
    this.overlay = {};
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

    return list.filter((item: { listName: string}) => 
    (!!item.listName.toLowerCase().match(new RegExp(search.toLowerCase())))
    );
    
	}
}