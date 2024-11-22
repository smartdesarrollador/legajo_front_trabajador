import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/interface/interface/registro_trabajador.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroTrabajadorServiceTsService {
  private apiUrl = `${environment.apiBaseUrl}/registro-trabajador`;

  constructor(private http: HttpClient) {}

  getTrabajadorById(id_user: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/${id_user}`);
  }
}
