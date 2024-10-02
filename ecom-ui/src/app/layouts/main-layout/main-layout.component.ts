import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started: ', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation ended: ', event.url);
      } else if (event instanceof NavigationCancel) {
        console.log('Navigation cancelled: ', event.url);
      } else if (event instanceof NavigationError) {
        console.log('Navigation error: ', event.error);
      }
    });
  }
}
