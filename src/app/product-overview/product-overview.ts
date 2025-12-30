import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

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

interface GumroadProductResponse {
  success: boolean;
  product: GumroadProduct;
}

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-overview.html',
})
export class ProductOverview {
  private readonly route = inject(ActivatedRoute);

  id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));

  productResource = httpResource<GumroadProductResponse>(() => {
    const id = this.id();
    if (!id) return undefined;
    // Use local proxy to keep token secure on server
    return `/api/gumroad/products/${id}`;
  });

  product = computed(() => {
    const response = this.productResource.value();
    if (!response?.success) {
      return null;
    }
    const p = response.product;
    return {
      name: p.name,
      version: '1.0', // Mock
      updated: 'Recently', // Mock
      rating: 5, // Mock
      description: p.description.replace(/<[^>]*>/g, ''),
      price: p.formatted_price,
      highlights: p.tags.length > 0 ? p.tags : ['High quality', 'Instant download'],
      license: 'Standard License', // Mock
      licenseLink: '#', // Mock
      imageSrc: p.preview_url,
      href: p.short_url,
    };
  });

  reviews = [
    {
      id: 1,
      rating: 5,
      content: `This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!`,
      date: 'July 16, 2021',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.`,
      date: 'July 12, 2021',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      rating: 4,
      content: `I really like the style of these icons, but I wish there were more categories. I'm building a healthcare app and there are only a few icons that are relevant to my industry.`,
      date: 'July 10, 2021',
      author: 'Mark Edwards',
      avatarSrc:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];
}
