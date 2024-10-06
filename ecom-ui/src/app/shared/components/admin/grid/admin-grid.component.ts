import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './admin-grid.component.html',
  styleUrl: './admin-grid.component.css'
})
export class AdminGridComponent {
  @Input() title: string = ''; 
  @Input() gridHeader: [] = [];
  @Input() gridData: [] = [];   
  @Input() isShowTip: [] = []; 
  @Input() isShowAddNew: boolean = true;
  @Input() isShowSearch: boolean = true;
  @Input() isShowAction: boolean = true;
  @Input() isShowFilter: boolean = true;

  constructor() { 

  } 

  ngOnInit() {
    console.log(this.gridHeader);
    console.log(this.gridData);
  }

  onSearch() {
    console.log('Search');
  }

  onFilter() {
    console.log('Filter');
  }

  onAddNew() {
    console.log('Add new');
  }

  onEdit() {
    console.log('Edit');
  }

  onDelete() {
    console.log('Delete');
  } 

  onSort() {
    console.log('Sort');
  } 

}
