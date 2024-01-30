import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserformComponent } from './userform.component';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserformComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ], 
  exports: [UserformComponent]
})
export class UserformModule { }
