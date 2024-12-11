import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearLicenciaService } from 'src/app/services/services/crear-licencia.service';

@Component({
  selector: 'app-crear-licencia',
  templateUrl: './crear-licencia.component.html',
  styleUrls: ['./crear-licencia.component.css'],
})
export class CrearLicenciaComponent implements OnInit {
  licenciaForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private crearLicenciaService: CrearLicenciaService,
    private router: Router
  ) {
    this.licenciaForm = this.fb.group(
      {
        fecha_emision: [
          new Date().toISOString().split('T')[0],
          Validators.required,
        ],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
        motivo: ['', [Validators.required, Validators.maxLength(500)]],
      },
      { validators: this.fechaValidator }
    );
  }

  fechaValidator(group: FormGroup) {
    const inicio = group.get('fecha_inicio')?.value;
    const fin = group.get('fecha_fin')?.value;

    if (inicio && fin && new Date(inicio) > new Date(fin)) {
      return { fechasInvalidas: true };
    }
    return null;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.licenciaForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const userId = localStorage.getItem('id_trabajador');

      if (!userId) {
        this.errorMessage = 'No se encontró el ID del usuario';
        this.loading = false;
        return;
      }

      const licenciaData = {
        fecha_emision: this.formatDate(this.licenciaForm.value.fecha_emision),
        fecha_inicio: this.formatDate(this.licenciaForm.value.fecha_inicio),
        fecha_fin: this.formatDate(this.licenciaForm.value.fecha_fin),
        motivo: this.licenciaForm.value.motivo,
        id_trabajador: Number(userId),
        id_area: 1,
        jefe_vacaciones: 'Nombre del Jefe',
      };

      console.log('Datos a enviar:', licenciaData);

      this.crearLicenciaService.crearLicencia(licenciaData).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate(['/admin/gestion/licencia']);
        },
        error: (error) => {
          console.error('Error completo:', error);
          this.errorMessage = error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
