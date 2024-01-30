import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalBuildingModule } from '../modal-building/modal-building.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ModalBuildingModule,
  ],
})
export class NavbarModule { }