import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  title: string = 'user';
  action: string = 'Create';
  form!: UntypedFormGroup; // Non-null assertion
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,private fb: UntypedFormBuilder) {

  }

  ngOnInit() {
    this.formSetup(); // Initialize the form
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
      first_name: new UntypedFormControl('', [Validators.required]), // First name field with required validation
      last_name: new UntypedFormControl('', [Validators.required]), // Last name field with required validation
      username: new UntypedFormControl('', [Validators.required]), // Username field with required validation
      email: new UntypedFormControl('', [Validators.required, Validators.email]), // Email field with required and email format validation
      password: new UntypedFormControl('', [Validators.required]), // Password field with required validation
      is_admin: new UntypedFormControl(false), // Checkbox for is_admin
    });
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
