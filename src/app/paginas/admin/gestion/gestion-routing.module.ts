import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';
import { CreatePermisosComponent } from './permisos/create-permisos/create-permisos.component';
import { LicenciasComponent } from './licencias/licencias.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
