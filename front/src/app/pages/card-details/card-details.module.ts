import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDetailsRoutingModule } from './card-details-routing.module';
import { CardDetailsComponent } from './card-details.component';
import { CardDetailsMaxiComponent } from 'src/app/shared/components/card-details-maxi/card-details-maxi.component';
import { CardDetailsMiniComponent } from 'src/app/shared/components/card-details-mini/card-details-mini.component';
import { ReservationComponent } from 'src/app/shared/components/reservation/reservation.component';

import { PrestationService } from 'src/app/shared/services/prestation.service'; 
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardDetailsComponent,
    CardDetailsMaxiComponent,
    CardDetailsMiniComponent,
    SafeUrlPipe,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    CardDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PrestationService 
  ]
})
export class CardDetailsModule { }
