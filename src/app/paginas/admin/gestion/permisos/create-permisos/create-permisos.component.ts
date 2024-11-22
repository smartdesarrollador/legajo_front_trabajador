import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from 'src/app/services/services/crear_permiso.service';
/* import { Trabajador } from 'src/app/interface/interface/obtener_trabajador.interface'; */
import { jwtDecode } from 'jwt-decode';
import { Trabajador } from 'src/app/interface/interface/registro_trabajador.interface';
import { RegistroTrabajadorServiceTsService } from 'src/app/services/services/registro-trabajador.service.ts.service';

@Component({
  selector: 'app-create-permisos',
  templateUrl: './create-permisos.component.html',
  styleUrls: ['./create-permisos.component.css'],
})
export class CreatePermisosComponent implements OnInit {
  token: any;
  userData: any;
  user_id: any;
  permisoForm: FormGroup;
  trabajador: Trabajador | null = null;
  loading: boolean = true;
  error: string | null = null;
  id_trab: number = 0;
  valor_id_trabajador: number | null = null;

  constructor(private fb: FormBuilder, private permisoService: PermisoService) {
    this.token = localStorage.getItem('token_trabajador');

    this.userData = jwtDecode(this.token);

    this.user_id = this.userData.user_id;

    this.valor_id_trabajador = Number(localStorage.getItem('id_trabajador'));

    this.permisoForm = this.fb.group({
      fecha_solicitud: [
        { value: new Date().toISOString().split('T')[0], disabled: true },
      ],
      comenzando_en: ['', Validators.required],
      terminando_en: ['', Validators.required],
      numero_horas: ['', [Validators.required, Validators.min(1)]],
      motivo_solicitud: ['', [Validators.required, Validators.maxLength(500)]],
      // Agregar campos faltantes
      id_area: [1], // Valor por defecto o desde un selector
      id_trabajador: [this.valor_id_trabajador], // Valor por defecto o desde un selector
    });
  }

  ngOnInit(): void {
    // La fecha de solicitud ya se establece en el constructor
  }

  onSubmit(): void {
    if (this.permisoForm.valid) {
      // Mapear los campos del formulario al formato que espera el backend
      const formData = {
        permiso: 'Permiso de trabajo', // O algún valor descriptivo
        fecha_inicio: this.permisoForm.get('comenzando_en')?.value,
        fecha_fin: this.permisoForm.get('terminando_en')?.value,
        horas: parseInt(this.permisoForm.get('numero_horas')?.value, 10),
        motivo: this.permisoForm.get('motivo_solicitud')?.value,
        id_area: this.permisoForm.get('id_area')?.value,
        id_trabajador: this.permisoForm.get('id_trabajador')?.value,
        jefe_inmediato: 'Juan Pérez', // O desde un campo del formulario
      };

      console.log('Datos a enviar:', formData);

      this.permisoService.crearPermiso(formData).subscribe({
        next: (response) => {
          console.log('Permiso creado exitosamente:', response);
          this.permisoForm.reset({
            fecha_solicitud: new Date().toISOString().split('T')[0],
          });
        },
        error: (error) => {
          console.error('Error al crear el permiso:', error);
        },
      });
    }
  }
}
