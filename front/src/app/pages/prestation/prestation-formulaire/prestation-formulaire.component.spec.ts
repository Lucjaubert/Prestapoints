// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PrestationFormulaireComponent } from './prestation-formulaire.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// describe('PrestationFormulaireComponent', () => {
//   let component: PrestationFormulaireComponent;
//   let fixture: ComponentFixture<PrestationFormulaireComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PrestationFormulaireComponent],
//       imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(PrestationFormulaireComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

  
//   it('should create a valid form with required fields', () => {
//     expect(component.prestationForm.valid).toBe(false);

//     const titleControl = component.prestationForm.get('title');
//     titleControl?.setValue('Title');
//     expect(component.prestationForm.valid).toBe(false);

//     const durationControl = component.prestationForm.get('duration');
//     durationControl?.setValue('10');
//     expect(component.prestationForm.valid).toBe(false);

//     const addPointControl = component.prestationForm.get('addPoint');
//     addPointControl?.setValue('Add Point');
//     expect(component.prestationForm.valid).toBe(false);

//     const dateStartControl = component.prestationForm.get('dateStart');
//     dateStartControl?.setValue(new Date());
//     expect(component.prestationForm.valid).toBe(false);

//     const dateEndControl = component.prestationForm.get('dateEnd');
//     dateEndControl?.setValue(new Date());
//     expect(component.prestationForm.valid).toBe(false);

//     const stateControl = component.prestationForm.get('state');
//     stateControl?.setValue('State');
//     expect(component.prestationForm.valid).toBe(false);

//     const descriptionControl = component.prestationForm.get('description');
//     descriptionControl?.setValue('Description');
//     expect(component.prestationForm.valid).toBe(false);

//     const maxUserControl = component.prestationForm.get('maxUser');
//     maxUserControl?.setValue('5');
//     expect(component.prestationForm.valid).toBe(true);
//   });

// });
//