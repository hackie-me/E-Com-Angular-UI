import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  title: string = 'blog';
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
      title: new UntypedFormControl('', [Validators.required]),
      slug: new UntypedFormControl('', [Validators.required]),
      content: new UntypedFormControl('', [Validators.required]),
      thumbnail: new UntypedFormControl('', [Validators.required]),
      category_id: new UntypedFormControl('', [Validators.required]),
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
      alert('Blog Submitted Successfully!');
      console.log('Form Data:', this.form.value);
    }
  }
}
