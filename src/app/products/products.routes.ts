import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products').then((m) => m.Products),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./products-list-page/products-list-page').then((m) => m.ProductsListPage),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../product-overview/product-overview').then((m) => m.ProductOverview),
      },
    ],
  },
];
