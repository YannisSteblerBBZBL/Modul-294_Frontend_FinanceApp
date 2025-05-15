// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { KeycloakService } from '../services/auth/keycloak.service';
import { Observable, of, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  const checkAuthentication = (): Observable<boolean | UrlTree> => {
    if (keycloakService.isAuthenticatedSync()) {
      return of(true);
    }

    return from(keycloakService.refreshToken()).pipe(
      switchMap((refreshed) => {
        if (refreshed || keycloakService.isAuthenticatedSync()) {
          return of(true);
        }
        return of(router.createUrlTree(['/auth/login']));
      }),
      catchError(() => of(router.createUrlTree(['/auth/login'])))
    );
  };

  return checkAuthentication();
};
