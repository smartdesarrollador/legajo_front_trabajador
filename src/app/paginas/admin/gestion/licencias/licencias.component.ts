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
    // Inicializar con el mes actual
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.formularioBusqueda.patchValue({
      fechaDesde: this.formatearFecha(inicioMes),
      fechaHasta: this.formatearFecha(finMes),
    });

    this.consultarLicencias();
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
      console.log('Consultando licencias con parámetros:', {
        fechaDesde,
        fechaHasta,
        userId,
      });

      this.licenciaService
        .consultarLicencias(fechaDesde, fechaHasta, userId)
        .subscribe({
          next: (data) => {
            console.log('Datos recibidos:', data);
            this.licencias = data;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al consultar licencias:', error);
            this.loading = false;
            // Aquí podrías mostrar un mensaje de error al usuario
          },
        });
    } else {
      console.log('Formulario inválido:', this.formularioBusqueda.errors);
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
