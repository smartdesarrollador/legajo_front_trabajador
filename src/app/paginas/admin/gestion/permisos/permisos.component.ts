import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permiso } from 'src/app/interface/interface/permiso.interface';
import { PermisosService } from 'src/app/services/services/permisos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  searchForm!: FormGroup; // Añadido el operador ! para asegurar la inicialización
  permisos: Permiso[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private permisosService: PermisosService,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.searchForm.patchValue({
      fecha_inicio: this.formatDate(firstDay),
      fecha_fin: this.formatDate(lastDay),
    });

    this.consultarPermisos();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  consultarPermisos(): void {
    if (this.searchForm.valid) {
      this.loading = true;
      const { fecha_inicio, fecha_fin } = this.searchForm.value;
      const idUserInStorage = Number(localStorage.getItem('id_user'));
      console.log(idUserInStorage);
      const userId = idUserInStorage; // Este valor debería venir de tu servicio de autenticación

      this.permisosService
        .consultarPermisos(fecha_inicio, fecha_fin, userId)
        .subscribe({
          next: (permisos) => {
            this.permisos = permisos;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }

  solicitarPermiso(): void {
    this.router.navigate(['/admin/gestion/permiso/create']);
  }

  verAcuerdo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
