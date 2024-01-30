import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalBuildingComponent } from './modal-building.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
  ],
  declarations: [ModalBuildingComponent],
  exports: [ModalBuildingComponent],
})
export class ModalBuildingModule { }