import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignInComponent } from './sign-in.component';
import { UserService } from 'src/app/shared/services/user.service';
import { FormUserComponent } from 'src/app/shared/components/form-user/form-user.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent, FormUserComponent], 
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
