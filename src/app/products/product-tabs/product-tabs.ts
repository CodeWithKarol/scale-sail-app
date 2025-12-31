import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlDirective } from '../../shared/directives/safe-html.directive';

export interface Review {
  id: number;
  rating: number;
  content: string;
  date: string;
  author: string;
  avatarSrc: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface License {
  summary: string;
  content: string;
}

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [CommonModule, SafeHtmlDirective],
  templateUrl: './product-tabs.html',
})
export class ProductTabsComponent {
  reviews = input.required<Review[]>();
  faqs = input.required<Faq[]>();
  license = input.required<License>();

  selectedTab = signal<'reviews' | 'faq' | 'license'>('reviews');
}
