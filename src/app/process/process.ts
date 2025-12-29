import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [],
  templateUrl: './process.html',
})
export class Process {
  steps = [
    {
      id: '01',
      title: 'Choose Template',
      description:
        'Browse our collection of conversion-optimized templates and pick the one that fits your niche.',
    },
    {
      id: '02',
      title: 'Customize Content',
      description:
        'Easily update text, images, and colors. Our clean code structure makes customization a breeze.',
    },
    {
      id: '03',
      title: 'Ship & Scale',
      description: "Deploy your new landing page and start collecting leads. You're ready to grow!",
    },
  ];
}
