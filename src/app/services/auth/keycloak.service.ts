import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../../config/keycloak.config';
import { RouteTrackerService } from './routeTracker.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak | undefined;
  private authenticated = new BehaviorSubject<boolean>(false);
  private initializing = new BehaviorSubject<boolean>(true);
  private router = inject(Router);
  private routeTracker = inject(RouteTrackerService);
  public async init(): Promise<boolean> {
    try {
      this.keycloak = new Keycloak(keycloakConfig);
      
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false
      });
      
      this.authenticated.next(authenticated);
      
      if (authenticated) {
        this.setupTokenRefresh();
        const redirectPath = this.routeTracker.getLastRoute() || '/';
        this.router.navigateByUrl(redirectPath);
      }
      
      return authenticated;
    } catch (error) {
      console.error('Failed to initialize Keycloak', error);
      return false;
    } finally {
      this.initializing.next(false);
    }
  }

  public login(): void {
    if (this.keycloak) {
      this.keycloak.login();
    }
  }

  public logout(): void {
    if (this.keycloak) {
      this.keycloak.logout({ redirectUri: window.location.origin + '/login' });
    }
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  public isAuthenticatedSync(): boolean {
    return this.authenticated.getValue();
  }

  public isInitializing(): Observable<boolean> {
    return this.initializing.asObservable();
  }

  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.keycloak && this.keycloak.token) {
        this.keycloak.updateToken(30)
          .then(() => {
            resolve(this.keycloak!.token as string);
          })
          .catch(() => {
            this.login();
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }

  public getUserInfo(): Record<string, unknown> | null {
    if (this.keycloak && this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed;
    }
    return null;
  }

  public getUsername(): string {
    return this.keycloak?.tokenParsed?.['preferred_username'] || '';
  }

  private setupTokenRefresh(): void {
    if (this.keycloak) {
      this.keycloak.onTokenExpired = () => {
        this.keycloak?.updateToken(30).catch(() => {
          this.logout();
        });
      };
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshed = await this.keycloak?.updateToken(30);
      if (refreshed) {
        console.log('Token refreshed');
      }
      return !!this.keycloak?.token;
    } catch (error) {
      console.error('Failed to refresh token', error);
      return false;
    }
  }

  public async getValidToken(): Promise<string | null> {
    try {
      await this.keycloak?.updateToken(30);
      return this.keycloak?.token ?? null;
    } catch (error) {
      console.error('Failed to get valid token', error);
      return null;
    }
  }

  getUserRoles(): string[] {
    if (this.keycloak && this.keycloak.authenticated) {
      const clientId = keycloakConfig.clientId;
      const clientRoles = this.keycloak.resourceAccess?.[clientId]?.roles || [];
      return clientRoles;
    }
    return [];
  }
  
  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }
  
  isManager(): boolean {
    return this.hasRole('MANAGER');
  }

  redirectToAccessDenied(message = 'You do not have permission to access this page.'): void {
    this.router.navigateByUrl('/access-denied', { 
      state: { message }
    });
  }
}