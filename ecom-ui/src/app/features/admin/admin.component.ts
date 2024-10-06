import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Correct typo here
})
export class AdminComponent implements OnInit {

  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Products', url: '/admin/products' },
    { label: 'Add New' },
  ];

  title: string = 'Add New Product'; 

  isBreadcrumbVisible: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit() { 
    // Subscribe to router events to detect NavigationEnd
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Log event for debugging purposes
        console.log('NavigationEnd event:', event);

        // Check both `url` and `urlAfterRedirects` to handle all cases
        const currentUrl = event.urlAfterRedirects || event.url;

        // Toggle breadcrumb visibility based on the current URL
        this.isBreadcrumbVisible = !currentUrl.includes('dashboard');
        console.log('Breadcrumb visibility:', this.isBreadcrumbVisible);
      }
    });
  }
}
