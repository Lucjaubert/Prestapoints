import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Prestation } from 'src/app/shared/model/prestation';

@Component({
  selector: 'app-card-details-maxi',
  templateUrl: './card-details-maxi.component.html',
  styleUrls: ['./card-details-maxi.component.scss']
})
export class CardDetailsMaxiComponent implements OnInit {
  @Input() prestation?: Prestation;
  videoUrl: SafeResourceUrl | undefined;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.prestation && this.prestation.videoLink) {
      // Utilisez la propriété videoLink de la prestation
      const sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.prestation.videoLink);
      this.videoUrl = sanitizedUrl;
    }
  }
}
