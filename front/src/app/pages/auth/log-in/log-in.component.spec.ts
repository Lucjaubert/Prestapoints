import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogInComponent } from './log-in.component';
import { AuthenticationService } from 'src/app/core/service/auth/authentication.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [HttpClientTestingModule, FormsModule], 
      providers: [AuthenticationService] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
