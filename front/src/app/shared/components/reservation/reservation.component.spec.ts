import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReservationComponent } from './reservation.component';
import { PrestationService } from '../../services/prestation.service';
import { of } from 'rxjs';
import { ResponseApi } from '../../model/responseApi';
import { Prestation } from '../../model/prestation';
import { Registration } from '../../model/registration';
import { User } from '../../model/user';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let prestationService: PrestationService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [HttpClientTestingModule],
      providers: [PrestationService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    prestationService = TestBed.inject(PrestationService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should undo registration', () => {
    //Arrange
    const mockPrestationId = 1;
    component.isRegistered = true;
    const mockResponse: ResponseApi = {
      responseValid: true,
      message: 'Annulation réussie',
    };
    //Act
    spyOn(prestationService, 'undoRegistration').and.returnValue(
      of(mockResponse)
    );
    component.undoRegistration(mockPrestationId);
    //Assert
    expect(component.isRegistered).toBeFalse();
  });

  it('should add registration', () => {
    //Arrange
    const mockPrestationId = 1;
    component.isRegistered = true;
    const mockResponse: ResponseApi = {
      responseValid: true,
      message: 'Inscription réussie',
    };
    //Act
    spyOn(prestationService, 'addRegistration').and.returnValue(
      of(mockResponse)
    );
    component.addRegistration(mockPrestationId);
    //Assert
    expect(component.isRegistered).toBeTrue();
  });

  it('should return is already registred', () => {
    //Arrange
    component.isRegistered = false;
    const mockUserConnected: User = {
      email: "test@email.com",
    }
    const mockRegistration: Registration = {
      user: mockUserConnected,
    }
    const mockPrestation: Prestation = {
      registrations: [mockRegistration],
      images: [],
      getDuration: '',
      getDateStartString: '',
      getTimeStartString: '',
      getDateTimeStartString: ''
    };
    component.prestation = mockPrestation;
    component.userConnected = mockUserConnected;
    //Act
    component.verifyRegistration();
    //Assert
    expect(component.isRegistered).toBeTrue();
  });
  
  it('should return is not registred', () => {
    //Arrange
    component.isRegistered = true;
    const mockUserConnected: User = {
      email: "test@email.com",
    }
    const mockUserRegistrered: User = {
      email: "another@email.com",
    }
    const mockRegistration: Registration = {
      user: mockUserRegistrered,
    }
    const mockPrestation: Prestation = {
      registrations: [mockRegistration],
      images: [],
      getDuration: '',
      getDateStartString: '',
      getTimeStartString: '',
      getDateTimeStartString: ''
    };
    component.prestation = mockPrestation;
    component.userConnected = mockUserConnected;
    //Act
    component.verifyRegistration();
    //Assert
    expect(component.isRegistered).toBeFalse();
  });
});
