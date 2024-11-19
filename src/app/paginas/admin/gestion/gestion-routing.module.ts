import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';
import { CreatePermisosComponent } from './permisos/create-permisos/create-permisos.component';

const routes: Routes = [
  {
    path: 'permiso',
    component: PermisosComponent,
  },
  {
    path: 'permiso/create',
    component: CreatePermisosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
