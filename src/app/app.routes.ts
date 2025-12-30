import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./hero/hero').then((m) => m.Hero),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then((m) => m.routes),
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog').then((m) => m.Blog),
  },
];
