import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface CustomModal {
  lists: any[];
}
interface CheckForm {
    listName ? : string; // the "?" makes the property optional, 
    checked ? : boolean; //  so you can start with an empty object
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog" style="overflow: scroll;overflow-y: auto;max-height: 90%;">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">CSV Export: Please select attributes to include!</h4>
                   </div>
                   <form #frm="ngForm" > 
                     <div *ngFor="let item of formArray; let i=index" class="col-md-6">
                     <div  class="modal-body" style="padding-top:5px;padding-bottom:5px;">
                     
                     <input type="checkbox" class="css-checkbox" id="{{item?.listName}}" name={{item?.listName}} [(ngModel)]="formArray[i].checked" value="{{item.listName}}" >
                     <label for="{{item?.listName}}" name="checkbox-lbl" class="css-label lite-green-check">{{item.listName}}</label>                                          
                     </div>
                     </div>
                   </form>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">Export</button>
                   </div>
                 </div>
              </div>`
})
export class ModalComponent extends DialogComponent<CustomModal, CheckForm[]> implements CustomModal, OnInit {
  lists: any[];
  formArray: CheckForm[] = [];
  @ViewChild('frm') form;

  constructor(dialogService: DialogService) {
    super(dialogService);    
  }
  ngOnInit(){
     for(var i = 0; i < this.lists.length; i++){
      var obj:CheckForm = {};
      if(this.lists[i] == 'companyName' || this.lists[i] == 'blurb' || this.lists[i] == 'website' || this.lists[i] == 'stage' 
      || this.lists[i] == 'location' || this.lists[i] == 'background' || this.lists[i] == 'verticals' || this.lists[i] == 'competition' 
      || this.lists[i] == 'advantage' || this.lists[i] == 'caseStudy' || this.lists[i] == 'comments'){
        obj.listName = this.lists[i];
        obj.checked = true;
        this.formArray.push(obj);
      }else{
        obj.listName = this.lists[i];
        obj.checked = false;
        this.formArray.push(obj);
      }
    }
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
   /* for(var i = 0; i < this.formArray.length; i++){
      console.log(this.formArray[i])
    }*/
    this.result = this.formArray;
    this.close();
  }
}