import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Permiso } from 'src/app/interface/interface/crear_permiso.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private apiUrl = `${environment.apiBaseUrl}/crear-permiso`;

  constructor(private http: HttpClient) {}

  crearPermiso(permiso: Permiso): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    console.log('Enviando datos al servidor:', permiso);

    return this.http.post(this.apiUrl, permiso, { headers }).pipe(
      catchError((error) => {
        console.error('Error detallado:', error);
        return throwError(
          () =>
            new Error(
              'Error al crear el permiso. Por favor, intente nuevamente.'
            )
        );
      })
    );
  }
}
