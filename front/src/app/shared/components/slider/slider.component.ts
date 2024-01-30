import { Component, Input, OnInit } from "@angular/core";
import { Prestation } from "../../model/prestation";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() prestationsApi?: Prestation[];
  public currentIndex = 0;
  public prestationsToDisplay: Prestation[] = [];

  constructor() {}

  ngOnInit() {
    this.updatePrestationsToDisplay();
  }

  prev() {
    if (this.prestationsApi) {
      this.currentIndex = (this.currentIndex - 1 + this.prestationsApi.length) % this.prestationsApi.length;
    }
    this.updatePrestationsToDisplay();
  }

  next() {
    if (this.prestationsApi) {
      this.currentIndex = (this.currentIndex + 1) % this.prestationsApi.length;
    }
    this.updatePrestationsToDisplay();
  }

  private updatePrestationsToDisplay() {
    if (this.prestationsApi && this.prestationsApi.length > 0) {
      this.prestationsToDisplay = [];
  
      for (let i = 0; i < 4; i++) {
        const index = (this.currentIndex + i) % this.prestationsApi.length;
        const prestation = this.prestationsApi[index];
  
        if (prestation) {
          this.prestationsToDisplay.push(prestation);
        }
      }
  
      let additionalIndex = 1;
      while (this.prestationsToDisplay.length < 4) {
        const index = (this.prestationsApi.length + this.currentIndex - additionalIndex) % this.prestationsApi.length;
        const prestation = this.prestationsApi[index];
  
        if (prestation) {
          this.prestationsToDisplay.unshift(prestation);
          additionalIndex++;
          } else {
            break;  
        }
      }
    }
  }
}