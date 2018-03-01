import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AdminService } from './admin.service';

export interface CustomModal {
  obj: any;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Edit User - {{obj.name}}</h4>
                   </div>
                  <form #userForm="ngForm" (ngSubmit)="submit()">
                   <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                     <label for="input01">Name</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="name" [ngModelOptions]="{standalone: true}" class="form-control" id="input01" value="{{obj?.name}}" placeholder="{{obj?.name}}" required>
                     <label for="input02">Email</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="email" [(ngModel)]="email" [ngModelOptions]="{standalone: true}" class="form-control" id="input02" value="{{obj?.email}}" placeholder="{{obj?.email}}" required>
                     <label for="input03">Role</label>
                     <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="role" [ngModelOptions]="{standalone: true}" class="form-control" id="input03" value="{{obj?.role}}" placeholder="{{obj?.role}}" required>
                     <div *ngIf="obj?.pnpOffice">
                     <label for="pnpOffices">PnP Office(s)</label>                     
                     <p style="color:#f44336;display: inline;font-size: 12px;margin-left:10px;">NOTE: Only required for "global" role. Select 'current" +- other offices to update.</p>
                     <p style="color:black;display: block;font-size: 13px;margin-bottom:0px;">Current Offices:</p>
                     <div *ngFor="let office of pnpOffice">
                     <p style="color:black;display: inline;font-size: 12px;margin-left:10px;">{{office}}</p>
                     </div>
                     <select style="border:1px solid rgba(0, 0, 0, 0.6)" multiple class="form-control" [(ngModel)]="pnpOffice" name="pnpOffices" id="pnpOffices">
                       <option style="color: black;">Plug and Play Headquarters (Silicon Valley)</option>
                       <option style="color: black;">FinTech - New York</option>
                       <option style="color: black;" ng-reflect-selected="true">FinTech - Abu Dhabi - ADGM Plug and Play</option>
                       <option style="color: black;">FinTech - Paris - BNP Paribas-Plug and Play</option>
                       <option style="color: black;">FinTech - Tokyo</option>
                       <option style="color: black;">Health - Cleveland</option>
                       <option style="color: black;">Health - Munich</option>
                       <option style="color: black;">InsurTech - Munich</option>
                       <option style="color: black;">InsurTech - New York</option>
                       <option style="color: black;">InsurTech - Tokyo</option>
                       <option style="color: black;">Mobility - Stuttgart - Startup Autobahn</option>
                       <option style="color: black;">Mobility - Berlin - Beyond1435</option>
                       <option style="color: black;">Mobility - Tokyo</option>
                       <option style="color: black;">Plug and Play APAC</option>
                       <option style="color: black;">Plug and Play China</option>
                       <option style="color: black;">Plug and Play Japan</option>
                       <option style="color: black;">Retail - Amsterdam - Fashion for Good</option>
                       <option style="color: black;">Retail - Munich - Retailtech Hub</option>
                       <option style="color: black;">Retail - Paris - Lafayette Plug and Play</option>
                     </select>
                     </div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary"  (click)="cancel()">Cancel</button>
                     <button type="submit" class="btn btn-primary" (click)="initSubmit()">Submit</button>
                   </div>
                   </form>
                 </div>
              </div>`,
    providers: [AdminService]
})
export class EditModal extends DialogComponent<CustomModal, number> implements CustomModal, OnInit {
  obj: any;
  name: string;
  email: string;
  role: string;
  pnpOffice: any;
  submitAttempt: boolean = false;

  constructor(dialogService: DialogService, private _adminService: AdminService) {
    super(dialogService);  
    this._adminService = _adminService;
  }
  ngOnInit(){
    //console.log(this.obj);
    this.name = this.obj.name;
    this.email = this.obj.email;
    this.role = this.obj.role;
    if(this.obj.pnpOffice){
      this.pnpOffice = this.obj.pnpOffice.split(',');
    }
    //console.log(this.pnpOffice);
    
  }
  submit() {
    this.obj.name = this.name;
    this.obj.email = this.email;
    this.obj.role = this.role;
    this.obj.pnpOffice = this.pnpOffice;
    //console.log(this.obj);
    this._adminService.updateUser(JSON.stringify(this.obj)).map(res => {
      // If request fails, throw an Error that will be caught
      if(res.status == 204) {
        this.result = 2;
        this.close()
      } else if (res.status < 200 || res.status >= 300){
        this.result = 2;
        this.close()
      }
      // If everything went fine, return the response
      else {
        this.result = 1;
        this.close();
        return res.json();
        
      }
    }).subscribe(data => this.obj = data,
      err => console.error('Error: ' + err),
          () => console.log("")
      );
  }
  initSubmit(){
	  this.submitAttempt = true;
  }
  cancel(){
    this.result = 3;
    this.close();
  }
}