import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultaLicencia } from 'src/app/interface/interface/consulta_licencia.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LicenciaService {
  private apiUrl = environment.apiBaseUrl + '/consulta-licencia';

  constructor(private http: HttpClient) {}

  consultarLicencias(
    idUser: number,
    fechaDesde?: string,
    fechaHasta?: string
  ): Observable<ConsultaLicencia[]> {
    let params = new HttpParams().set('id_user', idUser.toString());

    if (fechaDesde && fechaHasta) {
      params = params
        .set('fecha_desde', fechaDesde)
        .set('fecha_hasta', fechaHasta);
    }

    return this.http.get<ConsultaLicencia[]>(this.apiUrl, { params });
  }
}
