import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  rol_valor: any;
  id_user: any;
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (localStorage.getItem('token_trabajador')) {
      const token = localStorage.getItem('token_trabajador');

      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);
          console.log('Decoded JWT:', decodedToken);
          localStorage.setItem('id_user', decodedToken.user_id);
          this.rol_valor = decodedToken.rol;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.router.navigate(['auth/login']);
          return false;
        }
      }

      if (this.rol_valor == 'Trabajador') {
        if (token) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    } else {
      const tokenFromUrl = route.queryParamMap.get('token');
      console.log('Token recibido en la URL:', tokenFromUrl);

      if (tokenFromUrl) {
        try {
          const decodedToken = jwtDecode<any>(tokenFromUrl);
          console.log('Decoded JWT:', decodedToken);

          this.rol_valor = decodedToken.rol;
          localStorage.removeItem('token_trabajador');

          localStorage.setItem('token_trabajador', tokenFromUrl);
          localStorage.setItem('id_user', decodedToken.user_id);
          console.log('Token almacenado en localStorage como token_trabajador');
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.router.navigate(['auth/login']);
          return false;
        }
      }

      const tokenInStorage = localStorage.getItem('token_trabajador');

      if (this.rol_valor == 'Trabajador') {
        if (tokenFromUrl || tokenInStorage) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }
  };
}
