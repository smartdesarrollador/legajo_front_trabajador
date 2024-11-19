import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'contratacion',
    component: AdminComponent,
    loadChildren: () =>
      import('./contratacion/contratacion.module').then(
        (m) => m.ContratacionModule
      ),
  },
  {
    path: 'gestion',
    component: AdminComponent,
    loadChildren: () =>
      import('./gestion/gestion.module').then((m) => m.GestionModule),
  },
  {
    path: 'configuracion',
    component: AdminComponent,
    loadChildren: () =>
      import('./configuracion/configuracion.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
