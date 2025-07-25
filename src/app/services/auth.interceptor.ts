import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Check if error is due to expired token
      if (error.status === 401 && !req.url.includes('auth/login') && !req.url.includes('auth/refresh')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null); // Reset before refresh starts

          return authService.refreshToken().pipe(
            switchMap((res: any) => {
              isRefreshing = false;
              authService.storeTokens(res.access, authService.getRefreshToken()!);
              refreshTokenSubject.next(res.access);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.access}`,
                },
              });

              return next(retryReq);
            }),
            catchError((err) => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => err);
            })
          );
        } else {
          // Wait for the refresh to complete
          return refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((newAccessToken) => {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(retryReq);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
