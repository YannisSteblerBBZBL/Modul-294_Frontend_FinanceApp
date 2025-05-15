import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteTrackerService {
  private readonly STORAGE_KEY = 'lastRoute';

  constructor(private router: Router) {
    this.trackRoutes();
  }

  private trackRoutes(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const url = event.url;
        if (!url.startsWith('/auth/login') && !url.startsWith('/access-denied') && !url.startsWith('/auth/register')) {
          localStorage.setItem(this.STORAGE_KEY, url);
        }
      });
  }

  public getLastRoute(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  public clearLastRoute(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}