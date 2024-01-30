import { Component, OnInit } from '@angular/core';
import { Prestation } from 'src/app/shared/model/prestation';
import { PrestationService } from 'src/app/shared/services/prestation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public prestationsApi?: Prestation[];
  public originalPrestationsApi?: Prestation[];

  constructor(private prestationService: PrestationService) {}

  ngOnInit() {
    this.getPrestations();
  }

  needToRefresh($event: boolean) {
    if ($event) {
      this.getPrestations();
    }
  }

  getPrestations() {
    this.prestationService.getPrestations().subscribe((response) => {
      this.prestationsApi = response;
      this.originalPrestationsApi = response; 
    });
  }

  onGetPrestation(prestations: Prestation[] | null) {
    if (prestations === null) {
      console.log("Aucun atelier trouvé");
      if (!this.prestationService.isSearchInProgress()) {
        this.prestationsApi = this.originalPrestationsApi;
      }
    } else {
      console.log("Ateliers trouvés :", prestations);
      this.prestationsApi = prestations;
    }
  }
}
