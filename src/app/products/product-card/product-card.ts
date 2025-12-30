import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Product {
  id: number | string;
  name: string;
  href: string;
  price: string;
  description: string;
  options: string;
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
}
