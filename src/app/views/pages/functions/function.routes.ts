import { Routes } from "@angular/router";

export default [
  {
    path: 'budgets',
    loadComponent: () => import('./manage-budgets/manage-budgets.component').then(m => m.ManageBudgetsComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./manage-categories/manage-categories.component').then(m => m.ManageCategoriesComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./manage-transactions/manage-transactions.component').then(m => m.ManageTransactionsComponent)
  }
] as Routes;