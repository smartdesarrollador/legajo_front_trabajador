// src/app/services/trabajador.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/interface/interface/obtener_trabajador.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  obtenerTrabajador(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/trabajador/${id}`);
  }

  // Aquí puedes agregar más métodos según necesites, como:
  actualizarTrabajador(
    id: number,
    trabajador: Partial<Trabajador>
  ): Observable<Trabajador> {
    return this.http.put<Trabajador>(
      `${this.apiUrl}/trabajador/${id}`,
      trabajador
    );
  }

  listarTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/trabajador`);
  }
}
