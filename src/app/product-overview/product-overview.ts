import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-overview.html',
})
export class ProductOverview {
  product = {
    name: 'Application UI Icon Pack',
    version: '1.0',
    updated: 'June 5, 2021',
    rating: 4,
    description:
      'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
    price: '$220',
    highlights: [
      '200+ SVG icons in 3 unique styles',
      'Compatible with Figma, Sketch, and Adobe XD',
      'Drawn on 24 x 24 pixel grid',
    ],
    license:
      'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    licenseLink: 'Read full license',
  };

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
      content: `Really happy with look and options of these icons. I've found uses for them everywhere in my recent projects. I hope there will be 20px versions in the future!`,
      date: 'July 6, 2021',
      author: 'Mark Edwards',
      avatarSrc:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];
}
