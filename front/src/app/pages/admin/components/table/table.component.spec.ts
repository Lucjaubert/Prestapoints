import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; 
import { TableComponent } from './table.component';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/core/service/auth/authentication.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { UserformComponent } from '../userform/userform.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent,  UserformComponent],
      providers: [UserService, AuthenticationService, ToolsService],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
