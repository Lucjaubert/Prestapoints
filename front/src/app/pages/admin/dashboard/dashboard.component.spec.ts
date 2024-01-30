import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TableComponent } from '../components/table/table.component';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { UserformModule } from '../components/userform/userform.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, TableComponent,],
      providers: [UserService, ToolsService],
      imports:[HttpClientTestingModule, UserformModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
