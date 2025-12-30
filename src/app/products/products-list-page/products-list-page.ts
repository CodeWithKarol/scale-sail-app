import { Component, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ProductList } from '../product-list/product-list';
import { Product } from '../product-card/product-card';

interface GumroadProduct {
  id: string;
  name: string;
  preview_url: string;
  description: string;
  formatted_price: string;
  short_url: string;
  thumbnail_url: string;
  tags: string[];
  price: number;
  currency: string;
  published: boolean;
  sales_count: number;
  sales_usd_cents: number;
  customizable_price: boolean;
  require_shipping: boolean;
  custom_receipt: string | null;
  custom_permalink: string | null;
  subscription_duration: string | null;
  url: string | null;
  file_info: { [key: string]: string };
  max_purchase_count: number | null;
  deleted: boolean;
  custom_fields: any[];
  custom_summary: string;
  is_tiered_membership: boolean;
  recurrences: any | null;
  variants: any[];
  custom_delivery_url: string | null;
}

interface GumroadResponse {
  success: boolean;
  products: GumroadProduct[];
}

@Component({
  selector: 'app-products-list-page',
  imports: [ProductList],
  templateUrl: './products-list-page.html',
})
export class ProductsListPage {
  private readonly accessToken = 'VIK5oqu0ZuxUBaFDYXKBhlnmtMol7eF0XJNVTQy8LSU';
  private readonly url = `https://api.gumroad.com/v2/products?access_token=${this.accessToken}`;

  productsResource = httpResource<GumroadResponse>(() => this.url);

  products = computed<Product[]>(() => {
    const response = this.productsResource.value();
    if (!response?.success) {
      return [];
    }
    return response.products.map((p) => ({
      id: p.id,
      name: p.name,
      href: p.short_url,
      price: p.formatted_price,
      description: p.description.replace(/<[^>]*>/g, ''),
      options: 'Standard',
      imageSrc: p.preview_url,
      imageAlt: p.name,
    }));
  });
}
