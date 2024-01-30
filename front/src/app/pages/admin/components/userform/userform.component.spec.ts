import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserformComponent } from './userform.component';
import { UserService } from 'src/app/shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserformComponent', () => {
  let component: UserformComponent;
  let fixture: ComponentFixture<UserformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserformComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], 
      providers: [UserService] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
