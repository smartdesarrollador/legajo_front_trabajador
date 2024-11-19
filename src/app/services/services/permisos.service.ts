import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from 'src/app/interface/interface/permiso.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  consultarPermisos(
    fechaDesde: string,
    fechaHasta: string,
    idUser: number
  ): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(
      `${this.apiUrl}/consulta-permiso?fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}&id_user=${idUser}`
    );
  }

  /* crearPermiso(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-permiso`, formData);
  } */
}
