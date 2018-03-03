import { Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface CustomModal {
  lists: any[];
  company: any;
  title: string;
}
interface CheckForm {
    listName ? : string; // the "?" makes the property optional, 
    checked ? : boolean; //  so you can start with an empty object
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog" id="start-up-modal" style="max-height: 80vh; max-width: 500px; min-width: 400px; position:relative">
                <div class="modal-content" style="max-height: 80vh; display: inline-block;">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="myclose()" >&times;</button>
                     <h4 class="modal-title">Add '{{company.companyName}}' to a {{title}} List</h4>
                   </div>
                   <form #frm="ngForm" style="display: inline-block; overflow: scroll; position:relative; max-height: calc(80vh - 119px); max-width: 500px; min-width: 400px; margin-top: 10px;"> 
                     <div *ngFor="let item of formArray; let i=index" class="modal-body" style="padding-top:5px;padding-bottom:5px;position: relative; overflow: scroll;" >
                     <input type="checkbox" class="css-checkbox" id="{{item?.listName}}" name={{item?.listName}} [(ngModel)]="formArray[i].checked" value="{{item.listName}}" >
                     <label for="{{item?.listName}}" name="checkbox-lbl" class="css-label lite-green-check">{{item.listName}}</label>                                          
                     </div>
                   </form>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()" style="margin-top: -1px">Submit</button>
                   </div>
                 </div>
              </div>`
})
export class ModalComponent extends DialogComponent<CustomModal, CheckForm[]> implements CustomModal, OnInit {
  lists: any[];
  company: any;
  title: string;
  formArray: CheckForm[] = [];
  @ViewChild('frm') form;

  constructor(dialogService: DialogService) {
    super(dialogService);    
  }
  ngOnInit(){
    if(typeof this.lists != 'undefined'){
      for(var i = 0; i < this.lists.length; i++){
        var obj:CheckForm = {};
        obj.listName = this.lists[i].listName;
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
    document.body.classList.remove("noscroll");
    this.result = this.formArray;
    this.close();
  }

  myclose(){
    document.body.classList.remove("noscroll");
    this.close();
  }

}