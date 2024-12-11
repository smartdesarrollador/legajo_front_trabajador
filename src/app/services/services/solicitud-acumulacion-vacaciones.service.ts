import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface SolicitudAcumulacionVacaciones {
  fecha_solicitud: string;
  id_trabajador: number;
  periodo_acumulado: string;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudAcumulacionVacacionesService {
  private apiUrl = `${environment.apiBaseUrl}/vacaciones/solicitar-acumulacion`;

  constructor(private http: HttpClient) {}

  solicitarAcumulacion(
    solicitud: SolicitudAcumulacionVacaciones
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post(this.apiUrl, solicitud, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);

        if (error.status === 422) {
          const errores = error.error.errors || error.error;
          const mensajesError = Object.entries(
            errores as Record<string, string[]>
          ).map(([campo, mensajes]) => `${campo}: ${mensajes.join(', ')}`);
          return throwError(() => new Error(mensajesError.join('\n')));
        }

        return throwError(
          () =>
            new Error(
              'Error al procesar la solicitud de acumulación de vacaciones'
            )
        );
      })
    );
  }
}
