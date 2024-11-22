import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trabajador } from 'src/app/interface/interface/obtener_trabajador.interface';
import { TrabajadorService } from 'src/app/services/services/trabajador.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css'],
})
export class TrabajadorComponent implements OnInit {
  token: any;
  userData: any;
  user_id: any;

  trabajador: Trabajador | null = null;
  activeSection: 'profile' | 'documents' = 'profile';

  constructor(
    private trabajadorService: TrabajadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token_trabajador');

    this.userData = jwtDecode(this.token);

    this.user_id = this.userData.user_id;
    this.loadTrabajador(this.user_id);
  }

  loadTrabajador(id: number): void {
    this.trabajadorService.obtenerTrabajador(id).subscribe({
      next: (data) => {
        this.trabajador = data;
      },
      error: (error) => {
        console.error('Error al cargar trabajador:', error);
      },
    });
  }

  showSection(section: 'profile' | 'documents'): void {
    this.activeSection = section;
  }
}
