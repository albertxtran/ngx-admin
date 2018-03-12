import {Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from '../../@theme/providers/toaster.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

import { DealflowFormService } from './dealflowform.service';

import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Dealflowform } from './dealflowform.interface';
import {SupportingMemberComponent} from './supportingMember.component';
import {AttendeeComponent} from './attendee.component';



const URL = '/rest/plugandplay/api/v1/ventures/create';
//const URL = 'http://localhost:8080/plugandplay/api/v1/ventures/create';

@Component({
  selector: 'dealflowform',
  styleUrls: ['./dealflowform.scss'], 
  templateUrl: './dealflowform.html',
})
export class DealflowFormComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') myFileInput: ElementRef;
  public presignedJSON: any; // Contains: objectKey, presignedUrl
  public dealflowForm: FormGroup;

  company: Object;
  formData: Object;
  lists: any[];
  public error: boolean;
  public loading: boolean;
  submitAttempt = false;
  public uploader:FileUploader = new FileUploader({url: URL});
  public attendeeCount = 1;
  public currentUser: any;

  searchString: String;
  asyncUsers: Object;
  asyncCorporations: Object;
  page: Number;
  tmp: any[];
  keyuplock: boolean= false;

constructor(private _fb: FormBuilder, private route: ActivatedRoute, private _dealflowFormService: DealflowFormService,  public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router,) {
  var bytes  = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!');
  this.currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
  // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
  // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
  // this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));    
  this._dealflowFormService = _dealflowFormService;    
  this._toasterService.toastr.setRootViewContainerRef(vcr);      
}

 ngOnInit() {
  this.dealflowForm = this._fb.group({
    api_key: [''],
    corporate_id: ['', [Validators.required]],
    lead_id: ['', [Validators.required]],
    account_manager_id: ['', [Validators.required]],
    venture_associate_id: ['', [Validators.required]],
    champion_id : ['', [Validators.required]],
    supportingMembers: this._fb.array([]),
    attendees: this._fb.array([]),
    event_summary: ['', [Validators.required]],
    event_date : ['', [Validators.required]],
    event_start: ['', [Validators.required]],
    event_stop: ['', [Validators.required]],
    event_location: ['', [Validators.required]],
    event_agenda: ['', [Validators.required]],
    verticals : ['', [Validators.required]],
    specific_interests : ['', [Validators.required]],
    purpose : ['', [Validators.required]],
    relationship : ['', [Validators.required]],
    virtual_join : ['', [Validators.required]], //optional
    extra_detail : ['', [Validators.required]], //optional
  });

  this.addAttendee();
  this.addSupportingMember();

  }

  ngOnDestroy() {
  }

initAttendee() {
    return this._fb.group({
        name: ['', Validators.required],
        position: ['', Validators.required],
        email: ['', Validators.required]
    });
}

initSupportingMember() {
  return this._fb.group({
      supporting_member1: [''],
      supporting_member2: [''],
      supporting_member3: ['']
  });
}

addAttendee() {
  const control = <FormArray>this.dealflowForm.controls['attendees'];
  const addrCtrl = this.initAttendee();
  
  control.push(addrCtrl);

}

addSupportingMember() {
    const control = <FormArray>this.dealflowForm.controls['supportingMembers'];
    const addrCtrl = this.initSupportingMember();
    
    control.push(addrCtrl);

}

removeAttendee(i: number) {
    const control = <FormArray>this.dealflowForm.controls['attendees'];
    control.removeAt(i);
}

removeSupportingMember(i: number) {
  const control = <FormArray>this.dealflowForm.controls['supportingMembers'];
  control.removeAt(i);
}


save(model: Dealflowform) {
    //if(model["value"].supportingMembers[0].supporting_member1 != null)
    model["value"].api_key = this.currentUser.api_key;
    this.tmp = model["value"].event_date.split("-");
    model["value"].event_date = this.tmp[1]+'-'+this.tmp[2]+'-'+this.tmp[0];
    // call API to save
    console.log(JSON.stringify(model["value"]));
    // ...
    this._dealflowFormService.createDealflow_form(JSON.stringify(model["value"])).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Couldn't not submit new dealflow, please try again.", "Error", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("Could not submit new dealflow, please try again.", "Error", 4000);
      }
      // If everything went fine, return the response
      else {
        this._toasterService.showSuccess("The Dealflow has been created.", "Success!", 4000);
        //return res.json();
        
      }
    }).subscribe();
}

initSubmit(){

	  this.submitAttempt = true;
}

getFileLater() {
  console.log(this.myFileInput.nativeElement.files[0]);
}

fileChanged(event) {
  var file = event.target.files[0];
  var filesize = ((file.size/1024)/1024); // MB
  console.log("File size: "+filesize);
  if(filesize > 10){
    this.myFileInput.nativeElement.value = "";
    this._toasterService.showError("Please choose a file less than 10MB.", "", 4000);
    return false;
  }
  this._dealflowFormService.getAWSPresignedUrl(this.currentUser.api_key).map(res => {
    if(res.status == 204) {
      this._toasterService.showError("Could not validate your user, please try again.", "", 4000); 
    }
    if(res.status == 205) {
      this._toasterService.showError("There was an issue uploading your file, please try again.", "", 4000); 
    }
    if(res.status == 206) {
      this._toasterService.showError("Could not get presigned URL, please try again.", "", 4000); 
    }
    else if (res.status < 200 || res.status >= 300){
      this._toasterService.showError("Your user is not authorized to do this action.","", 4000);
    }
    else {
      return res.json();
      
    }
  }).subscribe(data => this.presignedJSON = data,
    err => console.error('Error: ' + err),
        () => console.log(JSON.stringify(this.presignedJSON))
            
    );
  console.log(event.target.files[0]);

}

getSuggestions(event: any){
  if(!this.keyuplock){
    this.searchString = event.target.value;
    this.page = 1;
    this.asyncUsers = null;

    if(this.searchString.length > 2){
        //this.asyncUsers = this._dealflowFormService.getUsersPage(1, this.searchString);//CompleterService.remote('/rest/plugandplay/api/v1/users/query/1?query=','',null);
        //console.log(JSON.stringify(this.asyncUsers));
        this._dealflowFormService.getUsersPage(this.page, this.searchString)
            .do(res => {
                if(res.status == 204) {
                  
                } else {
                    this.asyncUsers=res.data;
                }                
            }).map(res => res.data).subscribe();  
    }
  }
  else{
    this.keyuplock = false;
  }
}

getCorporationSuggestions(event: any){
  if(!this.keyuplock){
    this.searchString = event.target.value;
    this.page = 1;
    this.asyncCorporations = null;
    var idName = event.target.name;
    this.dealflowForm.controls[idName].setValue(null);

    if(this.searchString.length > 1){
        this._dealflowFormService.getCorporationsPage(this.page, this.searchString)
            .do(res => {
                if(res.status == 204) {
                  
                } else {
                    this.asyncCorporations=res.data;
                }                
            }).map(res => res.data).subscribe();  
    }
  }
  else{
    this.keyuplock = false;
  }
}

  nameSelected(event: any)
  {
      //var selectNum = event.target.value.substr(0,str.indexOf(' '));
      //var selectName = event.target.value.substr(str.indexOf(' ')+1);
      var tmpList = event.target.value.split(" ");
      var selectEmail = tmpList[tmpList.length - 1];
      var idName = event.target.name;

      if(this.asyncUsers != null)
      {
          Object.keys(this.asyncUsers).forEach(eachObj => {
              if(selectEmail == this.asyncUsers[eachObj].email)
              {
                this.keyuplock = true;
                event.target.value = this.asyncUsers[eachObj].name;
                //(<HTMLInputElement>document.getElementById(idName)).value = this.asyncUsers[eachObj].id;
                //this.id.nativeElement.value = this.asyncUsers[eachObj].id;
                this.dealflowForm.controls[idName].setValue(this.asyncUsers[eachObj].id);
              }
            });
      }
      this.asyncUsers = null;
  }

  corporationSelected(event: any)
  {
      //document.getElementById('supportingId').value = id;
      //var selectNum = event.target.value.substr(0,str.indexOf(' '));
      //var selectName = event.target.value.substr(str.indexOf(' ')+1);
      var selectCompanyName = event.target.value;
      var idName = event.target.name;

      if(this.asyncCorporations != null)
      {
          Object.keys(this.asyncCorporations).forEach(eachObj => {
              if(selectCompanyName == this.asyncCorporations[eachObj].companyName)
              {
                this.keyuplock=true;
                event.target.value = this.asyncCorporations[eachObj].companyName;
                //(<HTMLInputElement>document.getElementById(idName)).value = this.asyncUsers[eachObj].id;
                //this.id.nativeElement.value = this.asyncUsers[eachObj].id;
                this.dealflowForm.controls[idName].setValue(this.asyncCorporations[eachObj].id);
              }
            });
      }
      this.asyncCorporations = null;
  }

// newDealflow(){
//   this.uploader.onBuildItemForm = (fileItem: any, form: any) => {form.append('data', JSON.stringify(this.formData) ); console.log("fileItem++++"+fileItem);console.log("form++++"+form);};   
//   this.uploader.uploadAll();   
//   this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
//     //console.log("ImageUpload:uploaded:", item, status);
//     //console.log("Response: " +response)
//     if(status == 301) {
//       //this.showError("Couldn't update profile picture, please try again.", "Error");
//       this.showError("Failed to update dealflow logo! Error:301", "Error", 4000);
//     }if(status == 302) {
//       //this.showError("Couldn't update profile picture, please try again.", "Error");
//       this.showError("Email has already been used. Error:301", "Error", 4000); 
//     }if(status == 303) {
//       //this.showError("Couldn't update profile picture, please try again.", "Error");
//       this.showError("Website has already been used. Error:303", "Error", 4000); 
//     }if(status == 304) {
//       //this.showError("Couldn't update profile picture, please try again.", "Error");
//       this.showError("There is a problem with creating a thumbnail. Error:304", "Error", 4000); 
//     }else if (status < 200 || status >= 300){
//       this.showError("Failed to update dealflow logo!", "Error", 4000);
//     }
//     else {
//       this.showSuccess("The Dealflow has been created.", "Success!", 4000);
//       this.initForm();
//     }
//     };
//  }

newDealflowForm() {
  this._dealflowFormService.createDealflow_form(JSON.stringify(this.formData)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Couldn't not submit new dealflow, please try again.", "Error", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("Could not submit new dealflow, please try again.", "Error", 4000);
      }
      // If everything went fine, return the response
      else {
        this._toasterService.showSuccess("The Dealflow has been created.", "Success!", 4000);
        return res.json();
        
      }
    }).subscribe(data => this.company = data,
      err => console.error('Error: ' + err),
          () => console.log("Completed!")
      );
 }

/*  addAttendee(){
   this.attendeeCount++;
   console.log(this.attendeeCount);
 } */

/*  removeAttendee(){
   this.attendeeCount--;
 } */

}