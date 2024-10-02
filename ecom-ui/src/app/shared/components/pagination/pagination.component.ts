import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() showingStart: number = 0; 
  @Input() showingEnd: number = 0; 
  @Input() pages: number[] = []; 
}
