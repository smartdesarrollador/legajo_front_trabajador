import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { PermisosComponent } from './permisos/permisos.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { DescansosComponent } from './descansos/descansos.component';
import { BoletasComponent } from './boletas/boletas.component';
import { SancionesComponent } from './sanciones/sanciones.component';
import { ReconocimientosComponent } from './reconocimientos/reconocimientos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreatePermisosComponent } from './permisos/create-permisos/create-permisos.component';

@NgModule({
  declarations: [
    PermisosComponent,
    LicenciasComponent,
    DescansosComponent,
    BoletasComponent,
    SancionesComponent,
    ReconocimientosComponent,
    CreatePermisosComponent,
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class GestionModule {}
