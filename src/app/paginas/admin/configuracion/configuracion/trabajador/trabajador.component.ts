import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trabajador } from 'src/app/interface/interface/obtener_trabajador.interface';
import { TrabajadorService } from 'src/app/services/services/trabajador.service';
/* import {
  faEnvelope,
  faPhone,
  faMobileAlt,
  faBirthdayCake,
  faMapMarkerAlt,
  faGraduationCap,
  faWheelchair,
  faEdit,
  faEye,
  faDownload,
  faUpload,
} from '@fortawesome/free-solid-svg-icons'; */
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

  // FontAwesome icons
  /* icons = {
    envelope: faEnvelope,
    phone: faPhone,
    mobile: faMobileAlt,
    birthday: faBirthdayCake,
    location: faMapMarkerAlt,
    education: faGraduationCap,
    wheelchair: faWheelchair,
    edit: faEdit,
    eye: faEye,
    download: faDownload,
    upload: faUpload,
  }; */

  constructor(
    private trabajadorService: TrabajadorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* const id = this.route.snapshot.params['id']; */

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
        // Aquí podrías mostrar un mensaje de error al usuario
      },
    });
  }

  showSection(section: 'profile' | 'documents'): void {
    this.activeSection = section;
  }
}
