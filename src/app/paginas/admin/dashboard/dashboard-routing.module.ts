import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TrabajadorComponent } from '../configuracion/configuracion/trabajador/trabajador.component';

const routes: Routes = [
  /* {
    path: '',
    component: DashboardComponent,
  }, */
  {
    path: '',
    component: TrabajadorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
