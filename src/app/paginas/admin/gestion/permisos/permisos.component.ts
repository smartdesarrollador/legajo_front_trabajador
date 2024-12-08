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
    this.consultarPermisos();
  }

  consultarPermisos(): void {
    this.loading = true;
    const idUserInStorage = Number(localStorage.getItem('id_user'));
    const userId = idUserInStorage;

    const fechaInicio = this.searchForm.get('fecha_inicio')?.value;
    const fechaFin = this.searchForm.get('fecha_fin')?.value;

    this.permisosService
      .consultarPermisos(userId, fechaInicio, fechaFin)
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

  solicitarPermiso(): void {
    this.router.navigate(['/admin/gestion/permiso/create']);
  }

  verAcuerdo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
