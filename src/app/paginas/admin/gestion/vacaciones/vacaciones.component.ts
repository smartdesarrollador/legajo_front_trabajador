import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacacionesService } from 'src/app/services/services/vacaciones.service';
import {
  ConsultaVacaciones,
  ControlVacaciones,
} from 'src/app/interface/interface/consulta_vacaciones.interface';
import { localStorageService } from 'src/app/services/services/localstorage.service';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css'],
})
export class VacacionesComponent implements OnInit {
  vacacionesForm: FormGroup;
  vacaciones: ConsultaVacaciones[] = [];
  controlVacaciones: ControlVacaciones = {
    acumuladas: 0,
    tomadas: 0,
    restantes: 0,
  };
  loading = false;

  constructor(
    private fb: FormBuilder,
    private vacacionesService: VacacionesService,
    private localStorageService: localStorageService
  ) {
    this.vacacionesForm = this.fb.group({
      tipo_vacaciones: ['', Validators.required],
      fecha_desde: ['', Validators.required],
      fecha_hasta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeDates();
    this.consultarVacaciones();
  }

  private initializeDates(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.vacacionesForm.patchValue({
      fecha_desde: this.formatDate(firstDay),
      fecha_hasta: this.formatDate(lastDay),
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  consultarVacaciones(): void {
    if (this.vacacionesForm.valid) {
      this.loading = true;
      const userId = localStorage.getItem('id_user');

      if (!userId) {
        console.error('No se encontró el ID del usuario en localStorage');
        return;
      }

      const filtros = {
        ...this.vacacionesForm.value,
        id_user: parseInt(userId, 10),
      };

      this.vacacionesService.consultarVacaciones(filtros).subscribe({
        next: (data) => {
          this.vacaciones = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al consultar vacaciones:', error);
          this.loading = false;
        },
      });
    }
  }

  solicitarVacaciones(): void {
    // Implementar navegación a formulario de solicitud
  }
}
