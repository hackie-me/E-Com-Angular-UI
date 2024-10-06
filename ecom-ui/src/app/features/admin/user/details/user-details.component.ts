import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  title: string = 'user';
  action: string = 'Create';

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Current URL:', currentUrl);
        this.title = currentUrl.includes('create') ? 'Create New Category' : '';
        this.title = currentUrl.includes('edit') ? 'Edit Category' : '';
        this.title = currentUrl.includes('view') ? 'Category Details' : '';
        this.action = currentUrl.includes('edit') ? 'Edit' : '';
        this.action = currentUrl.includes('create') ? 'Create' : '';
        this.action = currentUrl.includes('view') ? 'View' : '';
        this.breadcrumbs = [
          { label: 'Dashboard', url: '/admin/dashboard' },
          { label: 'Categories', url: '/admin/categories' },
          { label: this.action },
        ];
      }
    });
  }
}
