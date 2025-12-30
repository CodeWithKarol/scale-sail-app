import { Component, input } from '@angular/core';

export interface Post {
  id: string;
  title: string;
  href: string;
  description: string;
  date: string;
  datetime: string;
  category: { title: string; href: string };
  author: { name: string; role: string; href: string; imageUrl: string };
  imageUrl: string;
}

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
})
export class PostCard {
  post = input.required<Post>();
}
