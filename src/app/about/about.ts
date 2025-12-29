import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
})
export class About {
  stats = [
    { label: 'Founded', value: '2021' },
    { label: 'Employees', value: '37' },
    { label: 'Countries', value: '12' },
    { label: 'Raised', value: '$25M' },
  ];
}
