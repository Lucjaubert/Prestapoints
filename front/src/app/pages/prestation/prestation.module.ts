import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestationRoutingModule } from './prestation-routing.module';
import { PrestationFormulaireComponent } from './prestation-formulaire/prestation-formulaire.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PrestationService } from 'src/app/shared/services/prestation.service';

@NgModule({
  declarations: [
    PrestationFormulaireComponent
  ],
  imports: [
    CommonModule,
    PrestationRoutingModule,
    FormsModule,ReactiveFormsModule,
  ],
  providers: [PrestationService], 
})
export class PrestationModule { }
