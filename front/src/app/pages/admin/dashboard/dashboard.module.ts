import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from '../components/table/table.component';
import { UserformModule } from '../components/userform/userform.module';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { SearchModule } from '../components/search/search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent, TableComponent
  ],
  imports: [
    CommonModule, UserformModule, SearchModule,    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ToolsService]
})
export class DashboardModule { }
