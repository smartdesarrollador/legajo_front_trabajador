import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTrabajadorComponent } from './listar-trabajador/listar-trabajador.component';

const routes: Routes = [
  {
    path: 'listar_trabajador',
    component: ListarTrabajadorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
