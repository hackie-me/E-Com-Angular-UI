import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent {
  title: string = '';
  action: string = 'Create';
  form!: UntypedFormGroup; // Non-null assertion for the form

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,private fb: UntypedFormBuilder) {

  }
  countries = ['USA', 'Canada', 'Australia']; // Example countries, replace with actual data
  states: { [key: string]: string[] } = {
    USA: ['California', 'Florida', 'New York'],
    Canada: ['Ontario', 'Quebec', 'British Columbia'],
    Australia: ['New South Wales', 'Victoria', 'Queensland'],
  };
  cities: { [key: string]: string[] } = {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Florida: ['Miami', 'Orlando', 'Tampa'],
    NewYork: ['New York City', 'Buffalo', 'Rochester'],
    Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
    Quebec: ['Montreal', 'Quebec City', 'Gatineau'],
    BritishColumbia: ['Vancouver', 'Victoria', 'Surrey'],
    NewSouthWales: ['Sydney', 'Newcastle', 'Central Coast'],
    Victoria: ['Melbourne', 'Geelong', 'Ballarat'],
    Queensland: ['Brisbane', 'Gold Coast', 'Cairns'],
  };
  
  selectedCountry: string | null = null;
  selectedState: string | null = null;
  selectedCity: string | null = null;

  ngOnInit() {
    this.formSetup(); // Initialize the form on component init
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

  formSetup() {
    this.form = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
      author_name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      company_name: new UntypedFormControl('', [Validators.required]),
      website: new UntypedFormControl(''),
      country: new UntypedFormControl('', [Validators.required]),
      state: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      category_type: new UntypedFormControl('', [Validators.required]),
    });
  }

  onCountryChange() {
    this.selectedState = null; // Reset state when country changes
    this.selectedCity = null; // Reset city when country changes
    this.form.get('state')?.setValue(''); // Clear the state form control
    this.form.get('city')?.setValue(''); // Clear the city form control
  }

  onStateChange() {
    this.selectedCity = null; // Reset city when state changes
    this.form.get('city')?.setValue(''); // Clear the city form control
  }

  validateForm() {
    if (this.form.invalid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
        this.form.controls[key].updateValueAndValidity();
      }
      alert('Add required fields');
    } else {
      alert('Form Submitted Successfully!'); // Replace with actual submit logic
      console.log('Form Data:', this.form.value);
    }
  }
}
