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
    idUser: number,
    fechaDesde?: string,
    fechaHasta?: string
  ): Observable<Permiso[]> {
    let url = `${this.apiUrl}/consulta-permiso?id_user=${idUser}`;

    if (fechaDesde && fechaHasta) {
      url += `&fecha_desde=${fechaDesde}&fecha_hasta=${fechaHasta}`;
    }

    return this.http.get<Permiso[]>(url);
  }

  /* crearPermiso(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-permiso`, formData);
  } */
}
