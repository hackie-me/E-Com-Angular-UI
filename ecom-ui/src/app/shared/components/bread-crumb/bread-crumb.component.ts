import { Component, Input } from '@angular/core';

interface Breadcrumb {
  label: string;
  url?: string; // URL is optional for the last breadcrumb
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() title: string = '';
}

