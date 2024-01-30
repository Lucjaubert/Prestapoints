  import { Component, Input, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { Prestation } from 'src/app/shared/model/prestation';
  import { PrestationService } from 'src/app/shared/services/prestation.service';

  @Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss']
  })
  export class CardDetailsComponent implements OnInit {
    prestation?: Prestation;
    private id?: string;

    constructor(
      private route: ActivatedRoute,
      private prestationService: PrestationService
    ) {}

    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.id = id;
          this.getPrestationDetails(id);
        }
      });
    }
    
    
    needToRefresh($event: boolean) {
      if ($event && this.id) {
        this.getPrestationDetails(this.id);
      }
    }
  

    getPrestationDetails(id: string): void {
      this.prestationService.getPrestationById(id)
        .subscribe(prestation => {
          this.prestation = prestation;
        });
    }
  }
