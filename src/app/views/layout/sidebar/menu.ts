import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Home',
    icon: 'home',
    link: '/home'
  },
  {
    label: 'Reports',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'activity',
    link: '/dashboard'
  },
  {
    label: 'Transactions Overview',
    icon: 'anchor',
    link: '/transactions'
  },
  {
    label: 'Functions',
    isTitle: true
  },
  {
    label: 'Manage Transactions',
    icon: 'alert-triangle',
    link: '/function/transactions'
  },
  {
    label: 'Manage Budgets',
    icon: 'clipboard',
    link: '/function/budgets'
  },
  {
    label: 'Manage Categories',
    icon: 'codepen',
    link: '/function/categories'
  },
  {
    label: 'Admin',
    isTitle: true
  },
  {
    label: 'User Overview',
    icon: 'users',
    link: '/user-overview'
  },
];
