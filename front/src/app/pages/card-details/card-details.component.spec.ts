// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CardDetailsComponent } from './card-details.component';
// import { ActivatedRoute } from '@angular/router';
// import { PrestationService } from 'src/app/shared/services/prestation.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CardDetailsMaxiComponent } from 'src/app/shared/components/card-details-maxi/card-details-maxi.component';
// import { CardDetailsMiniComponent } from 'src/app/shared/components/card-details-mini/card-details-mini.component';
// import { ReservationComponent } from 'src/app/shared/components/reservation/reservation.component';
// import { convertToParamMap, Params } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';


// // Créez un stub de l'ActivatedRoute
// export class ActivatedRouteStub {
//   private subject = new BehaviorSubject(convertToParamMap({}));
//   paramMap = this.subject.asObservable();

//   // Ajoutez une méthode pour définir les paramètres simulés
//   setParamMap(params: Params) {
//     this.subject.next(convertToParamMap(params));
//   }
// }

// describe('CardDetailsComponent', () => {
//   let component: CardDetailsComponent;
//   let fixture: ComponentFixture<CardDetailsComponent>;
//   let activatedRoute: ActivatedRouteStub;

//   beforeEach(async () => {
//     activatedRoute = new ActivatedRouteStub(); 
//     await TestBed.configureTestingModule({
//       declarations: [CardDetailsComponent, CardDetailsMaxiComponent, CardDetailsMiniComponent, ReservationComponent, ],
//       providers: [{ provide: ActivatedRoute, useValue: activatedRoute }, PrestationService],
//       imports: [RouterTestingModule, HttpClientTestingModule] 
//     })
//     .compileComponents();
//   });

//   it('should create', () => {
//     // Définir un paramètre simulé avant de créer le composant
//     activatedRoute.setParamMap({ id: 'votre_id_simulé' });

//     fixture = TestBed.createComponent(CardDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();

//     expect(component).toBeTruthy();
//   });
// });
