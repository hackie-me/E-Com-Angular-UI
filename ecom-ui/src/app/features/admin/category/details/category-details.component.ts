import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {

  title: string = 'catagory';
  action: string = 'Create';
  form!: UntypedFormGroup; // Use non-null assertion

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.formSetup(); // Initialize the form in ngOnInit
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
      categoryType: new UntypedFormControl('', [Validators.required]),
    });
  }

  validateForm() {
    if (this.form.invalid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched(); // markAsTouched instead of markAsUntouched
        this.form.controls[key].updateValueAndValidity(); // Update validity state
      }
      alert('Add required fields');
    } else {
      alert('Form Submitted Successfully!');
      console.log('Form Data:', this.form.value);
    }
  }
}
