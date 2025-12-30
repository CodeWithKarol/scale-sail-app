import { Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ProductList } from '../product-list/product-list';
import { Product } from '../product-card/product-card';
import { Pagination } from '../../shared/pagination/pagination';

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
  imports: [ProductList, Pagination],
  templateUrl: './products-list-page.html',
})
export class ProductsListPage {
  // Use local proxy to keep token secure on server
  private readonly url = `/api/gumroad/products`;

  productsResource = httpResource<GumroadResponse>(() => this.url);

  currentPage = signal(1);
  pageSize = signal(5);

  products = computed<Product[]>(() => {
    const response = this.productsResource.value();
    if (!response?.success) {
      return [];
    }
    return response.products
      .filter((p) => p.published)
      .map((p) => ({
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

  paginatedProducts = computed(() => {
    const products = this.products();
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return products.slice(startIndex, startIndex + this.pageSize());
  });

  totalItems = computed(() => this.products().length);

  onPageChange(page: number) {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
