import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.html',
})
export class ProductGalleryComponent {
  images = input.required<string[]>();
  selectedIndex = signal(0);
  isEnlarged = signal(false);

  selectImage(index: number) {
    this.selectedIndex.set(index);
  }

  toggleEnlarged() {
    this.isEnlarged.update((v) => !v);
  }
}
