// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_user: number;
  rol: string;
  // otros campos que pueda tener tu token
}

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  private readonly TOKEN_KEY = 'token_trabajador';
  private readonly USER_ID_KEY = 'user_id';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.setUserDataFromToken(token);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.USER_ID_KEY);
    return userId ? Number(userId) : null;
  }

  private setUserDataFromToken(token: string): void {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      localStorage.setItem(this.USER_ID_KEY, decodedToken.id_user.toString());
    } catch (error) {
      console.error('Error decodificando token:', error);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
