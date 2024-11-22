// trabajador.component.ts
import { Component, OnInit } from '@angular/core';
/* import { RegistroTrabajadorServiceTsService } from './registro-trabajador.service';
import { Trabajador } from './interfaces/obtener_trabajador.interface'; */

import { RegistroTrabajadorServiceTsService } from 'src/app/services/services/registro-trabajador.service.ts.service';
import { Trabajador } from 'src/app/interface/interface/registro_trabajador.interface';

@Component({
  selector: 'app-listar-trabajador',
  templateUrl: './listar-trabajador.component.html',
  styleUrls: ['./listar-trabajador.component.css'],
})
export class ListarTrabajadorComponent implements OnInit {
  trabajador: Trabajador | null = null;
  loading = false;
  error: string | null = null;
  valor_id_trabajador: number | null = null;

  constructor(private trabajadorService: RegistroTrabajadorServiceTsService) {}

  ngOnInit(): void {
    this.valor_id_trabajador = Number(localStorage.getItem('id_user'));
    this.cargarTrabajador(this.valor_id_trabajador); // Asume que queremos cargar el trabajador con ID 1
  }

  cargarTrabajador(id: number): void {
    this.loading = true;
    this.error = null;

    this.trabajadorService.getTrabajadorById(id).subscribe({
      next: (data) => {
        this.trabajador = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del trabajador';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  // Método helper para mostrar nombre completo
  getNombreCompleto(): string {
    if (!this.trabajador) return '';

    const partes = [
      this.trabajador.primer,
      this.trabajador.segundo,
      this.trabajador.paterno,
      this.trabajador.materno,
    ].filter((parte) => parte); // Filtra los valores null/undefined

    return partes.join(' ');
  }
}
