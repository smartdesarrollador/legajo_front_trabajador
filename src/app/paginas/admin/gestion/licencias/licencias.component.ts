import { Component, OnInit } from '@angular/core';
import { LicenciaService } from 'src/app/services/services/licencia.service';
import { ConsultaLicencia } from 'src/app/interface/interface/consulta_licencia.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.css'],
})
export class LicenciasComponent implements OnInit {
  licencias: ConsultaLicencia[] = [];
  formularioBusqueda: FormGroup;
  idUsuario: number = 1;
  loading: boolean = false;

  constructor(
    private licenciaService: LicenciaService,
    private fb: FormBuilder
  ) {
    this.formularioBusqueda = this.fb.group({
      fechaDesde: ['', Validators.required],
      fechaHasta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idUserInStorage = localStorage.getItem('id_user');
    if (idUserInStorage) {
      const userId = Number(idUserInStorage);
      this.consultarTodasLasLicencias(userId);
    }
  }

  consultarTodasLasLicencias(userId: number): void {
    this.loading = true;
    this.licenciaService.consultarLicencias(userId).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.licencias = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al consultar licencias:', error);
        this.loading = false;
      },
    });
  }

  consultarLicencias(): void {
    if (this.formularioBusqueda.valid) {
      this.loading = true;
      const { fechaDesde, fechaHasta } = this.formularioBusqueda.value;
      const idUserInStorage = localStorage.getItem('id_user');

      if (!idUserInStorage) {
        console.error('No se encontró el ID del usuario en el localStorage');
        return;
      }

      const userId = Number(idUserInStorage);

      this.licenciaService
        .consultarLicencias(userId, fechaDesde, fechaHasta)
        .subscribe({
          next: (data) => {
            this.licencias = data;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al consultar licencias:', error);
            this.loading = false;
          },
        });
    }
  }

  private formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }

  solicitarLicencia(): void {
    // Implementar la navegación a la página de solicitud de licencia
    console.log('Navegando a solicitud de licencia...');
  }
}
