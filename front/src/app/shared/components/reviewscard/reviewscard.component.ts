import { Component, Input, OnInit } from '@angular/core';
import { Prestation } from '../../model/prestation';
import { Location } from '../../model/location';
import { Registration } from '../../model/registration';

@Component({
  selector: 'app-reviewscard',
  templateUrl: './reviewscard.component.html',
  styleUrls: ['./reviewscard.component.scss'],
})
export class ReviewscardComponent {
  @Input() public registration?: Registration;
  @Input() public registrationApi?: Registration;
  @Input() public prestation?: Prestation;
  @Input() public location?: Location;

  stars: boolean[] = Array(5).fill(false); // Tableau de 5 éléments initialisé à false

  constructor() {}

  setEvaluation(index: number) {
    this.stars = this.stars.map((_, i) => i <= index);
  }
}
