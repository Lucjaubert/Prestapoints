import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestationFormulaireComponent } from './prestation-formulaire/prestation-formulaire.component';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { UserGuard } from 'src/app/core/guard/user.guard';

const routes: Routes = [
  {
    path: 'formulaire', component: PrestationFormulaireComponent, canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestationRoutingModule { }
