import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { Blog } from './blog/blog';
import { Faq } from './faq/faq';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, Blog, Faq, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('scale-sail-app');
}
