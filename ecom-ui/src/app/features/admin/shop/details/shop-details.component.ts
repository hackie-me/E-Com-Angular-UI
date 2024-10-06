import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent {
  title: string = '';
  action: string = 'Create';

  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {

  }

  countries = ['USA', 'Canada', 'Australia'];
  states: { [key: string]: string[] } = {
    USA: ['California', 'Texas', 'Florida'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    Australia: ['New South Wales', 'Victoria', 'Queensland']
  };
  cities: { [key: string]: string[] } = {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Dallas', 'Austin'],
    Florida: ['Miami', 'Orlando', 'Tampa'],
    Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
    Quebec: ['Montreal', 'Quebec City', 'Laval'],
    BritishColumbia: ['Vancouver', 'Victoria', 'Kelowna'],
    NewSouthWales: ['Sydney', 'Newcastle', 'Wollongong'],
    Victoria: ['Melbourne', 'Geelong', 'Ballarat'],
    Queensland: ['Brisbane', 'Gold Coast', 'Cairns']
  };

  onCountryChange() {
    this.selectedState = '';
    this.selectedCity = '';
  }

  onStateChange() {
    this.selectedCity = '';
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
