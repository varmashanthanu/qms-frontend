import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken(); // Assuming this method exists

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Access token expired, try refreshing
        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            authService.storeTokens(res.access, authService.getRefreshToken()!);
            const cloned = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access}`,
              },
            });
            return next(cloned);
          }),
          catchError((err) => {
            // Refresh failed — logout
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
