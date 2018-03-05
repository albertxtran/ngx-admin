import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: ['./champion-modal.component.scss'],
  templateUrl: './champion-modal.component.html'
})

export class ChampionModal implements OnInit {

  @Output()
  out:EventEmitter<Object> = new EventEmitter();
  
  modalHeader: string;
  // modalContent: string = `Lorem ipsum dolor sit amet,
  //  consectetuer adipiscing elit, sed diam nonummy
  //  nibh euismod tincidunt ut laoreet dolore magna aliquam
  //  erat volutpat. Ut wisi enim ad minim veniam, quis
  //  nostrud exerci tation ullamcorper suscipit lobortis
  //  nisl ut aliquip ex ea commodo consequat.`;
  formData = {
    email : null,
    isPrimary : false
  }

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal() {
    this.out.emit(this.formData);
    this.activeModal.close();
  }
}
