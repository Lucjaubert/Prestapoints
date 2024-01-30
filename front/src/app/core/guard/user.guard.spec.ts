import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../service/auth/authentication.service';


describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthenticationService],
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
