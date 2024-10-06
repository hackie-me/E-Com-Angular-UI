import { Component, Input } from '@angular/core';

interface Breadcrumb {
  label: string;
  url?: string; // URL is optional for the last breadcrumb
}

@Component({
  selector: 'app-admin-breadcrumb',
  templateUrl: './admin-breadcrumb.component.html',
  styleUrl: './admin-breadcrumb.component.css'
})
export class AdminBreadcrumbComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() title: string = '';
}
