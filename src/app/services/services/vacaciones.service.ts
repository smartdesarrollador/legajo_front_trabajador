import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ConsultaVacaciones,
  FiltroVacaciones,
} from '../../interface/interface/consulta_vacaciones.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VacacionesService {
  private apiUrl = `${environment.apiBaseUrl}/consulta-vacaciones`;

  constructor(private http: HttpClient) {}

  consultarVacaciones(
    filtros: FiltroVacaciones
  ): Observable<ConsultaVacaciones[]> {
    let params = new HttpParams().set('id_user', filtros.id_user.toString());

    if (filtros.fecha_desde && filtros.fecha_desde.trim() !== '') {
      params = params.set('fecha_desde', filtros.fecha_desde);
    }
    if (filtros.fecha_hasta && filtros.fecha_hasta.trim() !== '') {
      params = params.set('fecha_hasta', filtros.fecha_hasta);
    }
    if (filtros.id_tipo_vacaciones) {
      params = params.set(
        'id_tipo_vacaciones',
        filtros.id_tipo_vacaciones.toString()
      );
    }

    return this.http.get<ConsultaVacaciones[]>(this.apiUrl, { params });
  }
}
