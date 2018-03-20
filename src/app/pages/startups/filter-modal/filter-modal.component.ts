import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


interface CheckForm {
  listName ? : string; // the "?" makes the property optional,
  checked ? : boolean; //  so you can start with an empty object
}

@Component({
  selector: 'add-service-modal',
  styleUrls: ['./filter-modal.component.scss'],
  templateUrl: './filter-modal.component.html'
})

export class FilterModal implements OnInit {

  @Output()
  out:EventEmitter<Object> = new EventEmitter();
  
  modalHeader: string;
  // modalContent: string = `Lorem ipsum dolor sit amet,
  //  consectetuer adipiscing elit, sed diam nonummy
  //  nibh euismod tincidunt ut laoreet dolore magna aliquam
  //  erat volutpat. Ut wisi enim ad minim veniam, quis
  //  nostrud exerci tation ullamcorper suscipit lobortis
  //  nisl ut aliquip ex ea commodo consequat.`;
  formArray: CheckForm[] = [];
  lists: any[];
  @ViewChild('frm') form;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(){
    if(typeof this.lists != 'undefined'){
      for(var i = 0; i < this.lists.length; i++){
        var obj:CheckForm = {};
        obj.listName = this.lists[i];
        obj.checked = false;
        this.formArray.push(obj);
       }
    }
  }

  submitModal() {
    this.out.emit(this.formArray);
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.close();
  }
}
