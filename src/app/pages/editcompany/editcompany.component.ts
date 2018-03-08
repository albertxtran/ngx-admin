import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from '../../@theme/providers/toaster.service';
import { FileUploader } from 'ng2-file-upload';

import { EditCompanyService } from './editcompany.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

const URL = '/rest/plugandplay/api/v1/ventures/logo';

@Component({
  selector: 'editcompany',
  styleUrls: ['./editcompany.scss'], 
  templateUrl: './editcompany.html'
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  company: any;
  formData: any;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  public pageload: boolean = false;
  submitAttempt = false;
  public uploader:FileUploader = new FileUploader({url: URL});
  currentUser: any;
  role: any;
  

constructor(private route: ActivatedRoute, private _companyService: EditCompanyService, public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router) {
  var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
  this.currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
  // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
  // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
  // this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));    
  this.role = this.currentUser.role;
  this._companyService = _companyService;    
  this._toasterService.toastr.setRootViewContainerRef(vcr);     
      
      
}

 ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.       //JSON.stringify(data)
    });
    this._companyService.getVenture(this.id).subscribe(data => this.company = data,
    error => console.error('Error: ' + error),
        () => console.log('Completed!')
    );
    this.initForm();
    this.pageload = true;
  }
  uploadPhoto(){
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => { form.append('id', this.id); };   
    this.uploader.uploadAll();   
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      //console.log("ImageUpload:uploaded:", item, status);
      //console.log("Response: " +response)
      if(status == 204) {
        this._toasterService.showError("Couldn't update profile picture, please try again.", "Error", 4000)
      } else if (status < 200 || status >= 300){
        this._toasterService.showError("Couldn't update profile picture, please try again", "Error", 4000)
      }
      else {
        this._toasterService.showError("Profile picture updated!", "Success!", 4000);
      }
      };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  updateCompany(){
    // console.log("Update test: "+JSON.stringify(form));
    //console.log("Update test: "+JSON.stringify(this.formData));
    for (var key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
         //console.log(key + ': ' + this.formData[key])
        if(this.formData[key] != null){
          //console.log(key + " -> " + this.formData[key]);
          this.company[key] = this.formData[key];
        }
      }
    }
    this._companyService.updateVenture(JSON.stringify(this.company)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Couldn't find venture in database to udpate.", "Error", 4000)
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("Could not update company, please try again.", "Error", 4000)
      }
      // If everything went fine, return the response
      else {
        this._toasterService.showError('Profile has been updated!','Success!', 4000);
        return res.json();
        
      }
    }).subscribe(data => this.company = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );

  }
  initForm(){
    this.formData = {
      companyName : null,
      blurb : null,
      verticals : null,
      website : null,
      pnpContact : null,
      contactName : null,
      email : null,
      phoneNumber : null,
      totalMoneyRaised : null,
      stage : null,
      b2bb2c : null,
      employees : null,
      location : null,
      city : null,
      competition : null,
      advantage : null,
      background : null,
      founded : null,
      partnerInterests : null,
      caseStudy : null,
      comments : null,
      tags : null,
      materials : null,
      dateOfInvestment : null,
      portfolio : null
    }
  }

}