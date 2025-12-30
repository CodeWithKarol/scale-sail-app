import { Component } from '@angular/core';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-products-list-page',
  imports: [ProductList],
  templateUrl: './products-list-page.html',
})
export class ProductsListPage {
  products = [
    {
      id: 1,
      name: 'Basic Tee 8-Pack',
      href: '#',
      price: '$256',
      description:
        'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
      options: '8 colors',
      imageSrc:
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
      imageAlt:
        'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    },
    {
      id: 2,
      name: 'Basic Tee',
      href: '#',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 3,
      name: 'Kinda White Basic Tee',
      href: '#',
      price: '$32',
      description: "It's probably, like, 5000 Kelvin instead of 6000 K.",
      options: 'White',
      imageSrc:
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Front of plain white t-shirt.',
    },
    {
      id: 4,
      name: 'Stone Basic Tee',
      href: '#',
      price: '$32',
      description: 'The perfect stone color for your summer wardrobe.',
      options: 'Stone',
      imageSrc:
        'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Front of plain stone t-shirt.',
    },
    {
      id: 5,
      name: 'Basic Tee 3-Pack',
      href: '#',
      price: '$96',
      description: 'Three of our most popular colors in one package.',
      options: '3 colors',
      imageSrc:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Three shirts in gray, white, and blue.',
    },
    {
      id: 6,
      name: 'Artwork Tee 3-Pack',
      href: '#',
      price: '$108',
      description: 'Our latest graphic designs on our most popular tee.',
      options: '3 colors',
      imageSrc:
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Three shirts with graphic designs.',
    },
  ];
}
