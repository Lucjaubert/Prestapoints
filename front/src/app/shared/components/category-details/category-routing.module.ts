import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './category-details.component';

const routes: Routes = [{ path: '', component: CategoryDetailsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
