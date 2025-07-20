import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/auth/login/';
  private router = inject(Router);

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, payload);
  }

  // Optional: Add methods for token storage
  storeTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshToken() {
    return this.http.post<{ access: string }>(
      'http://localhost:8000/api/v1/auth/refresh/', // your refresh endpoint
      { refresh: this.getRefreshToken() }
    );
  }

  logout() {
    this.clearTokens();
    this.router.navigate(['/login']);
  }
}
