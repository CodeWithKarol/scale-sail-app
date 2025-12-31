import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col justify-center items-center p-12 space-y-4">
      <div class="relative">
        <div class="h-12 w-12 rounded-full border-4 border-indigo-100"></div>
        <div
          class="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"
        ></div>
      </div>
      <span class="text-indigo-600 font-medium text-sm tracking-wider uppercase animate-pulse"
        >Loading</span
      >
    </div>
  `,
})
export class LoadingSpinnerComponent {}
