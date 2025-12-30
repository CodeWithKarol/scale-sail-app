import { Component, input } from '@angular/core';
import { Product, ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList {
  products = input.required<Product[]>();
}
