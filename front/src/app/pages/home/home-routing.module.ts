import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReservationComponent } from 'src/app/shared/components/reservation/reservation.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: '', component: ReservationComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
