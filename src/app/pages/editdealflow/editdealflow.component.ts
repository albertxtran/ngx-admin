import { Component, ViewChild, ElementRef, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef, ChangeDetectorRef, Input, Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToasterService } from '../../@theme/providers/toaster.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { EditDealflowService } from './editdealflow.service';

import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EditDealflow } from './editdealflow.interface';
import { SupportingMemberComponent } from './supportingMember.component';
import { AttendeeComponent } from './attendee.component';



const URL = '/rest/plugandplay/api/v1/ventures/create';
//const URL = 'http://localhost:8080/plugandplay/api/v1/ventures/create';

@Component({
  selector: 'editdealflow',
  styleUrls: ['./editdealflow.scss'], 
  templateUrl: './editdealflow.html',
})
export class EditDealflowComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') myFileInput: ElementRef;
  public presignedJSON: any; // Contains: objectKey, presignedUrl
  public editDealflow: FormGroup;
  company: Object;
  formData: Object;
  top100: Object;
  top20: Object;
  lists: any[];
  top20list: any[];
  public error: boolean;
  public loading: boolean;
  public loading20: boolean;
  submitAttempt = false;
  public uploader:FileUploader = new FileUploader({url: URL});
  public attendeeCount = 1;
  public currentUser: any;
  searchString: String;
  asyncUsers: Object;
  asyncCorporations: Object;
  page: Number;
  id: number;
  private sub: any;
  dealflowpage: any;
  dealflow: any;
  tmp: String;
  tmpDate: String;
  lead_name: String;
  lead_email: String;
  account_manager_name: String;
  account_manager_email: String;
  venture_associate_name: String;
  venture_associate_email: String;
  champion_name: String;
  champion_email: String;
  supporting_member1_name: String = "";
  supporting_member2_name: String = "";
  supporting_member3_name: String = "";
  supporting_member1_email: String = "";
  supporting_member2_email: String = "";
  supporting_member3_email: String = "";
  dealflowname: String;
  corporate_name: String[];
  public creatingpdf: boolean;
  public pageload: boolean = false;
  role: Observable<any>;
  keyuplock: boolean = false;


constructor(private _fb: FormBuilder, private route: ActivatedRoute, private _editDealflowService: EditDealflowService,  public _toasterService: ToasterService, vcr: ViewContainerRef, private router: Router, private cdr: ChangeDetectorRef) {
  this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'pnp4life!').toString(CryptoJS.enc.Utf8))
  // VERY IMPORTANT these methods will update the menu and routes dependent on the user role
  // this._menuService.updateMenuByRoutes(this._menuService.getPageMenu(this.currentUser));
  // this.router.resetConfig(this._menuService.getAuthRoutes(this.currentUser));    
  this._editDealflowService = _editDealflowService;    
  this._toasterService.toastr.setRootViewContainerRef(vcr);  
  this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.dealflowname = params['dealflowname'] || 0;
      });
  this.corporate_name = this.dealflowname.split(' ');
  this.getDealflow();
}

ngOnInit() {
  this.editDealflow = this._fb.group({
    id: [''],
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
      supporting_member3: [''],
      supporting_member1_name: [''],
      supporting_member2_name: [''],
      supporting_member3_name: [''],
  });
}

addAttendee() {
  const control = <FormArray>this.editDealflow.controls['attendees'];
  const addrCtrl = this.initAttendee();
  
  control.push(addrCtrl);

}

addSupportingMember() {
    const control = <FormArray>this.editDealflow.controls['supportingMembers'];
    const addrCtrl = this.initSupportingMember();
    
    control.push(addrCtrl);

}

removeAttendee(i: number) {
    const control = <FormArray>this.editDealflow.controls['attendees'];
    control.removeAt(i);
}

removeSupportingMember(i: number) {
  const control = <FormArray>this.editDealflow.controls['supportingMembers'];
  control.removeAt(i);
}


save(model: FormGroup) {
    //if(model["value"].supportingMembers[0].supporting_member1 != null)
    model["value"].api_key = this.currentUser.api_key;
    this.tmp = model["value"].event_date.split("-");
    model["value"].event_date = this.tmp[1]+'-'+this.tmp[2]+'-'+this.tmp[0];
    console.log(JSON.stringify(model["value"]));
    // ...
    this._editDealflowService.updateDealflow_form(JSON.stringify(model["value"])).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this._toasterService.showError("Couldn't not submit new dealflow, please try again.", "Error", 4000);
      } else if (res.status < 200 || res.status >= 300){
        this._toasterService.showError("Could not submit new dealflow, please try again.", "Error", 4000);
      }
      // If everything went fine, return the response
      else {
        this._toasterService.showError("The Dealflow has been created.", "Success!", 4000);
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
  this._editDealflowService.getAWSPresignedUrl(this.currentUser.api_key).map(res => {
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
    var idName = event.target.name;
    this.editDealflow.controls[idName].setValue(null);

    if(this.searchString.length > 2){
        //this.asyncUsers = this._editDealflowService.getUsersPage(1, this.searchString);//CompleterService.remote('/rest/plugandplay/api/v1/users/query/1?query=','',null);
        //console.log(JSON.stringify(this.asyncUsers));
        this._editDealflowService.getUsersPage(this.page, this.searchString)
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

nameSelected(event: any)
{
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
              this.editDealflow.controls[idName].setValue(this.asyncUsers[eachObj].id);
            }
          });
    }
    this.asyncUsers = null;
}

getUserById(user_id:Number, name: number, dealflow: any){
this.error = false;
this._editDealflowService.getUserById(user_id).map(res => {
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
  if(name == 1)
  {
    this.lead_name = res.name;
    this.lead_email = res.email;
    user_id = dealflow.accountManager_Id;
  }
  else if (name == 2)
  {
    this.account_manager_name = res.name;
    this.account_manager_email = res.email;
    user_id = dealflow.ventureAssociate_Id;
  }
  else if (name == 3)
  {
    this.venture_associate_name = res.name;
    this.venture_associate_email = res.email;  
    user_id = dealflow.champion_Id;    
  }
  else if (name == 4)
  {
    this.champion_name = res.name;
    this.champion_email = res.email;
    user_id = JSON.parse(dealflow.supporting_Members)[0].supporting_member1;
  }
  name++;
  if(name < 5){
    this.getUserById(user_id, name, dealflow);
  }
  else if (JSON.parse(dealflow.supporting_Members)[0].supporting_member1){
    this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member1, 1,dealflow);
  }
  else{
    this.loading = false;
  }
}
}).subscribe();
}
getUserById2(user_id:Number, name: number, dealflow: any){
this.error = false;
this._editDealflowService.getUserById(user_id).map(res => {
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
  if(name == 1)
  {
    this.supporting_member1_name = res.name;
    this.supporting_member1_email = res.email;
    if(JSON.parse(dealflow.supporting_Members)[0].supporting_member2){
      name++;
      this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member2, name,dealflow);
    }
    else{
      this.addValue(dealflow);
    }
  }
  else if (name == 2)
  {
    this.supporting_member2_name = res.name;
    this.supporting_member2_email = res.email;
    if(JSON.parse(dealflow.supporting_Members)[0].supporting_member3){
      name++;
      this.getUserById2(JSON.parse(dealflow.supporting_Members)[0].supporting_member3, name,dealflow);
    }
    else{
      this.addValue(dealflow);
    }
  }
  else if (name == 3)
  {
    this.supporting_member3_name = res.name;
    this.supporting_member3_email = res.email; 
    this.addValue(dealflow);  
  }
  return res;
}
}).subscribe();
}

getDealflow() {
  this.loading = true;
  this.error = false;
  this._editDealflowService.getDealflowByName(this.dealflowname).map(res => {
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
    console.log("my dealflow: " + JSON.stringify(res));
    this.dealflow = res;
    return res;
  }
}).subscribe((res)=>{ this.getUserById(res.lead_Id, 1, res)});
//}).subscribe((res)=>{ this.getNames(res)});

}

addValue(dealflow:any){
  this.editDealflow.controls['id'].setValue(dealflow.id);
  this.editDealflow.controls['corporate_id'].setValue(dealflow.corporate_Id);
  this.editDealflow.controls['lead_id'].setValue(dealflow.lead_Id);
  this.editDealflow.controls['corporate_id'].setValue(dealflow.corporate_Id);
  this.editDealflow.controls['account_manager_id'].setValue(dealflow.accountManager_Id);
  this.editDealflow.controls['venture_associate_id'].setValue(dealflow.ventureAssociate_Id);
  this.editDealflow.controls['champion_id'].setValue(dealflow.champion_Id);
  this.editDealflow.controls['event_summary'].setValue(dealflow.event_Summary);
  this.tmpDate = dealflow.event_Date.split("-");
  this.editDealflow.controls['event_date'].setValue(this.tmpDate[2]+'-'+this.tmpDate[0]+'-'+this.tmpDate[1]);
  this.editDealflow.controls['event_start'].setValue(dealflow.event_Start);
  this.editDealflow.controls['event_stop'].setValue(dealflow.event_Stop);
  this.editDealflow.controls['event_location'].setValue(dealflow.event_Location);
  this.editDealflow.controls['event_agenda'].setValue(dealflow.event_Agenda);
  this.editDealflow.controls['verticals'].setValue(dealflow.verticals);
  this.editDealflow.controls['specific_interests'].setValue(dealflow.specific_Interests);
  this.editDealflow.controls['purpose'].setValue(dealflow.purpose);
  this.editDealflow.controls['relationship'].setValue(dealflow.relationship);
  this.editDealflow.controls['virtual_join'].setValue(dealflow.virtual_Join);
  this.editDealflow.controls['extra_detail'].setValue(dealflow.extra_Detail);
  if(JSON.parse(dealflow.supporting_Members)[0].supporting_member1){
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member1_name").setValue(this.supporting_member1_name);
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member1").setValue(JSON.parse(dealflow.supporting_Members)[0].supporting_member1);
  }
  if(JSON.parse(dealflow.supporting_Members)[0].supporting_member2){
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member2_name").setValue(this.supporting_member2_name);
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member2").setValue(JSON.parse(dealflow.supporting_Members)[0].supporting_member2);
  }
  if(JSON.parse(dealflow.supporting_Members)[0].supporting_member3){
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member3_name").setValue(this.supporting_member3_name);
    (<FormArray>this.editDealflow.controls['supportingMembers']).at(0).get("supporting_member3").setValue(JSON.parse(dealflow.supporting_Members)[0].supporting_member3);
  }
  console.log("attendee list length: "+JSON.parse(dealflow.attendees).length);
  for(var i=0; i < JSON.parse(dealflow.attendees).length; i++){
    if(i > 0){
      this.addAttendee();
    }
    if(JSON.parse(dealflow.attendees)[i].name)
    {
      (<FormArray>this.editDealflow.controls['attendees']).at(i).get("name").setValue(JSON.parse(dealflow.attendees)[i].name);
      (<FormArray>this.editDealflow.controls['attendees']).at(i).get("position").setValue(JSON.parse(dealflow.attendees)[i].position);
      (<FormArray>this.editDealflow.controls['attendees']).at(i).get("email").setValue(JSON.parse(dealflow.attendees)[i].email);
    }
  }
  this.loading = false;
    //this.editDealflow.controls['supportingMembers'].setValue(dealflow.supporting_Members);
  //this.editDealflow.controls['attendees'].setValue(dealflow.attendees);

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

/*  addAttendee(){
   this.attendeeCount++;
   console.log(this.attendeeCount);
 } */

/*  removeAttendee(){
   this.attendeeCount--;
 } */

}