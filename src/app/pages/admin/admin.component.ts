import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FileUploader } from 'ng2-file-upload';
import * as CryptoJS from 'crypto-js';
import { FormArray, FormControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from './admin.service';
import { ToasterService } from '../../@theme/providers/toaster.service';

import { DialogService } from "ng2-bootstrap-modal";

import { FilterModal } from './filter.modal';
import { ConfirmModal } from './confirm.modal';
import { EditModal } from './edit.modal';

import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

export interface corporationInt {
    corporations: any[];
}

interface Filter {
  name ? : string;
  value ? : string;
}
@Component({
  selector: 'admin',
  styleUrls: ['./admin.scss'], 
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: ElementRef;
  @ViewChild('filterButton') filterButton: ElementRef;
  user: Object;
  userFormData: Object;
  public loading: boolean;
  public error: boolean;
  public loadingUser: boolean;
  public currentUser: any;
  submitAttempt = false;
  filters: Filter[] = new Array();
  filterList: any[] = ["Name","Email","Role"];
  filteron: boolean = false;
  useron: boolean = false;
  filterForm: FormGroup;
  deleteon: boolean = false;
  p: number = 1;
  total: number;
  asyncUsers: Observable<any[]>;
  searchString: String;
  searchAttempt: boolean = false;
  corporations: Object;
  testcorp : any[];
  champion: boolean = false;

  settings = {
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      role: {
        title: 'Role',
        type: 'string'
      }
    }
  };
  
constructor(private route: ActivatedRoute, private _adminService: AdminService, private dialogService:DialogService, public _toasterService: ToasterService , vcr: ViewContainerRef, private formBuilder: FormBuilder
    , private router: Router) { // , private _menuService: BaMenuService
        this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8));
      // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
      // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(currentUser));
      // this.router.resetConfig(this._menuService.getAuthRoutes(currentUser));
      //this.adminService = _adminService;    
      this._toasterService.toastr.setRootViewContainerRef(vcr);  
      
      this.filters = new Array(0);

      this.testcorp = [{"name":"john","value":"v1"},{"name":"steven","value":"v2"},{"name":"patrick","value":"v3"}]
      this._adminService.getCorporations().subscribe(data => this.corporations = data,
        error => console.error('Error: ' + error),
            //() => console.log(JSON.stringify(this.corporations))
        );
    
        this.filterForm = this.formBuilder.group({
            'Name': ['', Validators.required],
            'Email': ['', Validators.required],
            'Role': ['', Validators.required]
          });

        this.searchString = '';
        this.getPage(1);
}

  ngOnInit() {    
    
    /* let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
    eventObservable.subscribe(); */
    this.initUserForm();

  }

  ngOnDestroy() {
  }

  filterSearch(){
    for(var i = 0; i < this.filters.length; i ++){      
        if(this.filterForm.controls[this.filters[i].name].value != null){
            this.filters[i].value = this.filterForm.controls[this.filters[i].name].value
        }        
    }
    this.getPage(1);
  }

  editUser(user:any){

    let disposable = this.dialogService.addDialog(EditModal, {
        obj: user
        })
        .subscribe( isConfirmed =>{
            if(isConfirmed == 1){
                this._toasterService.showSuccess("Successfully updated user '" +user.name+"'", "Success!", 2000);
                this.useron = true;
                this.filterButton.nativeElement.click();
            }else if(isConfirmed == 2){
                this._toasterService.showWarning("Could not update "+user.name+", please try again.", "", 4000);
            }
        });
  }

  deleteUser(user:any){
    //console.log("id: "+user.id);
    //console.log("Name: "+user.name);
    //console.log("role: "+this.role);
    //console.log("index: "+JSON.stringify(this.asyncCompanies.findIndex(obj => obj == startup)));

    let disposable = this.dialogService.addDialog(ConfirmModal, {
        obj: user
        })
        .subscribe( isConfirmed =>{

            if(isConfirmed){
                var deleted;
                this._adminService.deleteUser(user.id).map(res => {
                    // If request fails, throw an Error that will be caught
                    if(res.status == 204) {
                      this._toasterService.showError("Could not delete "+user.name+", please try again.", "", 4000); 
                      this.deleteon = true;
                      this.filterButton.nativeElement.click(); 
                    } else if (res.status < 200 || res.status >= 300){
                      this._toasterService.showError("Could not delete "+user.name+", please try again.", "", 4000);
                      this.deleteon = true;
                      this.filterButton.nativeElement.click();  
                      throw new Error('This request has failed ' + res.status);
                    }
                    // If everything went fine, return the response
                    else {
                      this._toasterService.showSuccess("Successfully deleted user '" +user.name+"'", "Success!", 2000);
                        //remove element from asyncCompanies
                      
                      this.deleteon = true;
                      this.filterButton.nativeElement.click();                        
                      return res.json();
                      
                    }
                  }).subscribe(data => deleted = data,
                    err => console.error('Error: ' + err),
                        () => console.log('')
                            
                    );
            }
        });
    
  }

  removeFilter(name: any){
    for(var i = 0; i < this.filters.length; i ++){
        if(name == this.filters[i].name){
            this.filters.splice(i, 1);                
        } 
    }
    this.filterForm.controls[name].setValue(null);
    if(this.filters.length == 0){
        this.getPage(1);
    }         
}

filterModal() {        
    this.filterList = ["Name","Email","Role"];
    
    if(this.filteron == true){
        this.filteron = false;
        return null;
    }
    if(this.useron == true){
        this.useron = false;
        this.getPage(1);
        return null;
    }
    if(this.deleteon == true){
        this.deleteon = false;
        this.getPage(this.p)
        //console.log("Getting page!!!")
        return null;
    }

    
    for(var i = 0; i < this.filters.length; i++){
        for(var j = 0; j < this.filterList.length; j++)
        if(this.filters[i].name == this.filterList[j]){
            this.filterList.splice(j,1);
        }
    }       

    let disposable = this.dialogService.addDialog(FilterModal, {
        lists: this.filterList
        })
        .subscribe( isConfirmed =>{
            if(isConfirmed){
             
             for(var i = 0; i < isConfirmed.length; i++){
                if(isConfirmed[i].checked == true){   
                    //this.addFilter(isConfirmed[i].listName);
                    var obj:Filter = {};
                    obj.name = isConfirmed[i].listName;                        
                    if(typeof this.filters == 'undefined'){
                        this.filters = new Array(1);
                        this.filters[0] = obj;
                        this.filteron = true;
                        this.filterButton.nativeElement.click();
                      }else{
                        this.filters.push(obj);
                        this.filteron = true;
                        this.filterButton.nativeElement.click();                            
                    }             
                }
            }
            }

        });            
}

  getPage(page: number) {
    this.loading = true;
    this.error = false;
    if(this.filters.length > 0){
        this.asyncUsers = this._adminService.getUsersPageFilter(page, this.filters)
            .do(res => {
                if(res.status == 204) {
                  this.loading = false;
                  this.error = true;
                  console.log("Search did not return any results.")                  
                } else {
                    this.total = res.count;
                    this.p = page;
                    this.loading = false;
                }                
            }).map(res => res.data);          
       
    }else{
        this.asyncUsers = this._adminService.getUsersPage(page, this.searchString)
        .do(res => {
            if(res.status == 204) {
              this.loading = false;
              this.error = true;
              console.log("Search did not return any results.")                  
            } else {
                this.total = res.count;
                this.p = page;
                this.loading = false;
            }
            
        })
        .map(res => res.data);
    }            
}

luceneSearch(event: any){
    this.searchString = event.target.value;
    if(this.searchString.length > 2){
        this.getPage(1);
    }
    if(this.searchString.length == 0){
        this.getPage(1);
    }
}
 
initSubmit(){
	  this.submitAttempt = true;
}

addUser() {
  this.loadingUser = true;
  if(this.userFormData['role'] == 'corporation'){
    this.userFormData['cref_id'] = parseInt(this.userFormData['cref_id'][0]);
  }
  //console.log(JSON.stringify(this.userFormData));
  this._adminService.addUser(JSON.stringify(this.userFormData)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Could not add user, please contact a PnP admin.", "", 4000);
        this.loadingUser = false;
        this.useron = true;
        this.filterButton.nativeElement.click();
      } else if (res.status == 206){   
        this._toasterService.showWarning("Email address is already registered.", "", 4000);
        this.loadingUser = false;
        this.useron = true;
        this.filterButton.nativeElement.click();
      } else if (res.status < 200 || res.status >= 300){  
        this._toasterService.showError("Could not add user, please try again.", "", 4000);
        this.loadingUser = false;
        this.useron = true;
        this.filterButton.nativeElement.click();
      }
      // If everything went fine, return the response
      else {
        this.loadingUser = false;
        this._toasterService.showSuccess("Successfully added new user!", "Success!", 2000);
        this.initUserForm();
        this.useron = true;
        this.filterButton.nativeElement.click(); 
        return res.json();
        
      }
    }).subscribe(data => this.user = data,
      err => console.error('Error: ' + err),
          () => this.loadingUser = false
    );
 }

 initUserForm(){
    this.userFormData = {
      api_key :"f7d624c2-f89e-40b9-9e4b-ff2db471a998",
      name : null,
      email : null,
      password: "",
      pnpOffice: null,
      cref_id: null,
      champion: false,
      role : "user"
    }
  }
  initSearch(){
    this.searchAttempt = true;
  }

  toggleChampion(){
      this.userFormData['champion'] = !this.userFormData['champion'];
      //console.log(this.userFormData['champion']);
  }

  changeOption(value) {
    console.log("myvalue is: "+value);
}

}