import { TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/core/service/auth/authentication.service';
import { AppModule } from 'src/app/app.module';
 // Importez le module approprié ici

describe('AuthComponent', () => {
  let component: AuthComponent;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule], 
      providers: [AuthenticationService],
    });
    component = TestBed.createComponent(AuthComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
