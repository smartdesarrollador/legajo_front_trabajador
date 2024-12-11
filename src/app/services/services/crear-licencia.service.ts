import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface CrearLicencia {
  fecha_emision: string;
  fecha_inicio: string;
  fecha_fin: string;
  jefe_vacaciones?: string;
  motivo: string;
  id_area?: number;
  id_trabajador: number;
}

@Injectable({
  providedIn: 'root',
})
export class CrearLicenciaService {
  private apiUrl = `${environment.apiBaseUrl}/licencia/crear`;

  constructor(private http: HttpClient) {}

  crearLicencia(licencia: CrearLicencia): Observable<any> {
    console.log('URL de la petición:', this.apiUrl);
    console.log('Datos enviados:', licencia);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post(this.apiUrl, licencia, { headers }).pipe(
      catchError((error) => {
        console.log('Error completo:', error);

        if (error.status === 422) {
          const errores = error.error.errors || error.error;
          console.log('Errores de validación:', errores);

          const mensajesError = Object.entries(
            errores as Record<string, string[]>
          ).map(([campo, mensajes]) => {
            return `${campo}: ${mensajes.join(', ')}`;
          });

          return throwError(() => new Error(mensajesError.join('\n')));
        }

        return throwError(
          () =>
            new Error(
              'Error al crear la licencia. Por favor, intente nuevamente.'
            )
        );
      })
    );
  }
}
