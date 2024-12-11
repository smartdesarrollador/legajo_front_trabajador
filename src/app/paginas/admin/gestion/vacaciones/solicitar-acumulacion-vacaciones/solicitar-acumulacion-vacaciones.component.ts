import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudAcumulacionVacacionesService } from 'src/app/services/services/solicitud-acumulacion-vacaciones.service';
import { localStorageService } from 'src/app/services/services/localstorage.service';
import { RegistroTrabajadorServiceTsService } from 'src/app/services/services/registro-trabajador.service.ts.service';

@Component({
  selector: 'app-solicitar-acumulacion-vacaciones',
  templateUrl: './solicitar-acumulacion-vacaciones.component.html',
  styleUrls: ['./solicitar-acumulacion-vacaciones.component.css'],
})
export class SolicitarAcumulacionVacacionesComponent implements OnInit {
  solicitudForm: FormGroup;
  loading = false;
  currentYear = new Date().getFullYear();
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudAcumulacionVacacionesService,
    private localStorageService: localStorageService,
    private registroTrabajadorService: RegistroTrabajadorServiceTsService,
    private router: Router
  ) {
    this.solicitudForm = this.fb.group({
      tipo_vacaciones: ['acumulacion', Validators.required],
      fecha_solicitud: [this.today, Validators.required],
      periodo_acumulado: [this.currentYear.toString(), Validators.required],
      id_trabajador: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idTrabajador = localStorage.getItem('id_trabajador');
    if (idTrabajador) {
      this.solicitudForm.patchValue({
        id_trabajador: parseInt(idTrabajador),
      });
    } else {
      console.error('No se encontró el ID del trabajador en localStorage');
    }
  }

  onSubmit(): void {
    if (this.solicitudForm.valid && !this.loading) {
      this.loading = true;

      const solicitud = {
        fecha_solicitud: this.solicitudForm.get('fecha_solicitud')?.value,
        periodo_acumulado: this.solicitudForm.get('periodo_acumulado')?.value,
        id_trabajador: this.solicitudForm.get('id_trabajador')?.value,
      };

      console.log('Enviando solicitud:', solicitud);

      this.solicitudService.solicitarAcumulacion(solicitud).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate(['/admin/gestion/vacaciones']);
        },
        error: (error) => {
          console.error('Error detallado:', error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      console.log('Formulario inválido:', this.solicitudForm.errors);
    }
  }
}
