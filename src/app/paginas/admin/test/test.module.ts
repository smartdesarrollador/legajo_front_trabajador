import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ListarTrabajadorComponent } from './listar-trabajador/listar-trabajador.component';


@NgModule({
  declarations: [
    ListarTrabajadorComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
