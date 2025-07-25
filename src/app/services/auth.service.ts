import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environment';

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
  private apiUrl = `${environment.apiBaseUrl}auth/login/`;
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

  refreshToken(): Observable<{ access: string }> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token available');
    }
    return this.http.post<{ access: string }>(
      `${environment.apiBaseUrl}auth/refresh/`,
      { refresh }
    );
  }

  logout() {
    this.clearTokens();
    this.router.navigate(['/login']);
  }

  isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      return true; // If parsing fails, treat as expired
    }
  }

  // getValidAccessToken(): Observable<string> {
  //   const access = this.getAccessToken();
  //   if (access && !this.isTokenExpired(access)) {
  //     return of(access);
  //   } else {
  //     return this.refreshToken().pipe(
  //       tap(response => this.storeTokens(response.access, this.getRefreshToken()!)),
  //       map(response => response.access)
  //     );
  //   }
  // }
}
