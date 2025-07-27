import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class KioskAuthService {
  private baseUrl = `${environment.apiBaseUrl}`;
  private readonly apiUrl = `${this.baseUrl}kiosks/token/`;

  constructor(private http: HttpClient) {
  }

  login(kioskKey: string): Promise<any> {
    return lastValueFrom(this.http
      .post(this.apiUrl, {kiosk_key: kioskKey})
    ).then((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        return res;
      });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
