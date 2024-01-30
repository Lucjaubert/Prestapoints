import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/guard/user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'prestation',
    loadChildren: () =>
      import('./pages/prestation/prestation.module').then(
        (m) => m.PrestationModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'prestations/:id/details',
    loadChildren: () =>
      import('./pages/card-details/card-details.module').then(
        (m) => m.CardDetailsModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'categories/:id/prestations',
    loadChildren: () =>
      import(
        './shared/components/category-details/category-details.module'
      ).then((m) => m.CategoryDetailsModule),
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
