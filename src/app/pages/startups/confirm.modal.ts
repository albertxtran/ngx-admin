import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface CustomModal {
  company: any;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">Are you sure you want to delete '{{company.companyName}}'?</h4>
                   </div>

                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="cancel()">Cancel</button>
                     <button type="button" class="btn btn-primary" (click)="confirm()">Confirm</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmModal extends DialogComponent<CustomModal, Boolean> implements CustomModal, OnInit {
  company: any;

  constructor(dialogService: DialogService) {
    super(dialogService);    
  }
  ngOnInit(){

  }
  confirm() {
    this.result = true;
    this.close();
  }
  cancel(){
    this.result = false;
    this.close();
  }
}