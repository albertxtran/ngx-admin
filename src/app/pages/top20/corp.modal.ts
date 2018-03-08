import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface CustomModal {
  corporation: String;
}

@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog" style="overflow: scroll;overflow-y: auto;max-height: 90%;">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">PDF Export: Please enter a corporation name.</h4>
                   </div>
                   <form #frm="ngForm">
                     <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                       <label for="input01">Suggested startups for Corporation:</label>
                       <input style="color: #373a3c;border: 1px solid;border-color: #00abff;line-height: inherit;" type="text" [(ngModel)]="corporation" [ngModelOptions]="{standalone: true}" class="form-control" id="input01" placeholder="Corporation Name">
                     </div>
                   </form>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">Export</button>
                   </div>
                 </div>
              </div>`
})
export class CorpModalComponent extends DialogComponent<CustomModal, String> implements CustomModal {
  corporation: String;
  @ViewChild('frm') form;

  constructor(dialogService: DialogService) {
    super(dialogService);    
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
   /* for(var i = 0; i < this.formArray.length; i++){
      console.log(this.formArray[i])
    }*/
    this.result = this.corporation;
    this.close();
  }
}