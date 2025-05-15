import { Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'impressum',
    loadComponent: () => import('./views/pages/legal/impressum/impressum.component').then(c => c.ImpressumComponent)
  },
  {
    path: 'agb',
    loadComponent: () => import('./views/pages/legal/agb/agb.component').then(c => c.AgbComponent)
  },
  {
    path: 'data-protection-law',
    loadComponent: () => import('./views/pages/legal/data-protection-law/data-protection-law.component').then(c => c.DataProtectionLawComponent)
  },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.routes')},

  {
    path: '',
    component: BaseComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./views/pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'function',
        loadChildren: () => import('./views/pages/functions/function.routes'),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./views/pages/reports/dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: 'transactions',
        loadComponent: () => import('./views/pages/reports/transactions-overview/transactions-overview.component').then(c => c.TransactionsOverviewComponent),
      },
      {
        path: 'user-overview',
        loadComponent: () => import('./views/pages/reports/user-overview/user-overview.component').then(c => c.UserOverviewComponent),
        canActivate: [adminGuard],
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'error',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent),
  },
  {
    path: 'error/:type',
    loadComponent: () => import('./views/pages/error/error.component').then(c => c.ErrorComponent)
  }
];
