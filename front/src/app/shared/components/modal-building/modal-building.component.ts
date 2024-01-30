import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-building',
  templateUrl: './modal-building.component.html',
  styleUrls: ['./modal-building.component.scss']
})
export class ModalBuildingComponent implements OnInit {
  message: string = 'Page en cours de création';

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    
  }

  closeModal() {
    console.log('closeModal()');
    this.modalRef.hide();
  }
}
