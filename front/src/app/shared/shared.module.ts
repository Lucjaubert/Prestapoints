import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [CardComponent, SliderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CardComponent, SliderComponent],
})
export class SharedModule {}
