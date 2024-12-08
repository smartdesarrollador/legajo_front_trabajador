import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id_tipo_vacaciones: [''],
      fecha_desde: [''],
      fecha_hasta: [''],
    });
  }

  ngOnInit(): void {
    this.consultarVacaciones();
  }

  consultarVacaciones(): void {
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

  solicitarVacaciones(): void {
    // Implementar navegación a formulario de solicitud
  }
}
