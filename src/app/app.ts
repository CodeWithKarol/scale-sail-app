import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { About } from './about/about';
import { Products } from './products/products';
import { ProductOverview } from './product-overview/product-overview';
import { Process } from './process/process';
import { Blog } from './blog/blog';
import { Faq } from './faq/faq';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Hero,
    Features,
    About,
    Products,
    ProductOverview,
    Process,
    Blog,
    Faq,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('scale-sail-app');
}
