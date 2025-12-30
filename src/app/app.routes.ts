import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./hero/hero').then((m) => m.Hero),
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products').then((m) => m.Products),
  },
];
