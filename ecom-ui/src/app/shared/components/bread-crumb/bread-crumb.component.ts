import { Component, Input } from '@angular/core';
import Breadcrumb from '../../interfaces/bread-crump';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() title: string = '';
}

