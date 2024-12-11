import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';
import { CreatePermisosComponent } from './permisos/create-permisos/create-permisos.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { VacacionesComponent } from './vacaciones/vacaciones.component';
import { CrearLicenciaComponent } from './licencias/crear-licencia/crear-licencia.component';
import { SolicitarAcumulacionVacacionesComponent } from './vacaciones/solicitar-acumulacion-vacaciones/solicitar-acumulacion-vacaciones.component';

const routes: Routes = [
  {
    path: 'permiso',
    component: PermisosComponent,
  },
  {
    path: 'permiso/create',
    component: CreatePermisosComponent,
  },
  {
    path: 'licencia',
    component: LicenciasComponent,
  },
  {
    path: 'licencia/create',
    component: CrearLicenciaComponent,
  },
  {
    path: 'vacaciones',
    component: VacacionesComponent,
  },
  {
    path: 'vacaciones/solicitar-acumulacion',
    component: SolicitarAcumulacionVacacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
