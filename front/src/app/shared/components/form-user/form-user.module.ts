import { NgModule } from '@angular/core';
import { FormUserComponent } from './form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FormUserComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [FormUserComponent]
})
export class FormUserModule {
  
}