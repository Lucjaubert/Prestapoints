import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SearchbarComponent],
  exports: [
    SearchbarComponent, FormsModule
  ]
})
export class SearchbarModule { }
