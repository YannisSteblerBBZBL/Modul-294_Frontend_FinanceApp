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
    label: 'Functions',
    isTitle: true
  },
  {
    label: 'Manage Transactions',
    icon: 'credit-card',
    link: '/transactions'
  },
  {
    label: 'Manage Budgets',
    icon: 'codesandbox',
    link: '/budgets'
  },
  {
    label: 'Manage Categories',
    icon: 'bell',
    link: '/categories'
  }
];
