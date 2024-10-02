import { Component, OnInit } from '@angular/core';
import { StyleManagerService } from './core/services/style-manager.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private isAdminPanel: boolean = true; // Tracks the current panel (admin or user)
  private currentStyle: string | null = null; // Tracks the currently applied stylesheet

  constructor(private router: Router, private styleManager: StyleManagerService) {}

  ngOnInit() {

    // Listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isAdminUrl = event.urlAfterRedirects.includes('admin');

        // Switch to admin styles if navigating to admin routes and the styles are not applied yet
        if (isAdminUrl) {
          console.log('Loading admin styles...');
          this.loadStyle('css/admin.css'); // Admin styles
          this.isAdminPanel = true;
        }

        // Switch to user styles if navigating to non-admin routes and user styles are not applied yet
        if (!isAdminUrl) {
          console.log('Loading user styles...');
          this.loadStyle('assets/css/style.css'); // User styles
          this.isAdminPanel = false;
        }
      }
    });
  }

  // Helper method to load a stylesheet only if it's not already applied
  private loadStyle(stylePath: string) {
    if (this.currentStyle !== stylePath) {
      this.styleManager.setStyle(stylePath); // Apply the stylesheet
      this.currentStyle = stylePath; // Update the currentStyle reference
    }
  }
}4
