import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { EmpresaComponent } from './empresa/empresa.component';
import { EditarEmpleadorComponent } from './empresa/editar-empleador/editar-empleador.component';
import { TrabajadorComponent } from './configuracion/trabajador/trabajador.component';

@NgModule({
  declarations: [EmpresaComponent, EditarEmpleadorComponent, TrabajadorComponent],
  imports: [CommonModule, ConfiguracionRoutingModule, ReactiveFormsModule],
})
export class ConfiguracionModule {}
