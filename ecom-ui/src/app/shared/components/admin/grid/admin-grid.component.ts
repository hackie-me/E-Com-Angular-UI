import { Component, EventEmitter, Input, Output } from '@angular/core';
import ActionRoutes from '../../../interfaces/action-routes';
import GridHeader from '../../../interfaces/grid-header';

@Component({
  selector: 'app-admin-grid',
  templateUrl: './admin-grid.component.html',
  styleUrl: './admin-grid.component.css'
})

export class AdminGridComponent {
  @Input() title: string = ''; 
  @Input() gridHeader: GridHeader[] = [];
  @Input() gridData: any = [];   
  @Input() routesData: ActionRoutes[] = [];    
  @Input() isShowTip: boolean = false; 
  @Input() isShowAddNew: boolean = true;
  @Input() isShowSearch: boolean = true;
  @Input() isShowAction: boolean = true;
  @Input() isShowFilter: boolean = true;
  @Input() isShowImage: boolean = true;

  @Output() onSearchEvent: EventEmitter<any> = new EventEmitter();
  @Output() onFilterEvent: EventEmitter<any> = new EventEmitter();
  @Output() onViewEvent: EventEmitter<any> = new EventEmitter();
  @Output() onAddNewEvent: EventEmitter<any> = new EventEmitter();
  @Output() onEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter(); 
  searchText: string = ''; 

  constructor() {  } 

  ngOnInit() { }
  
  onSearch() {
    console.log('Search');
    this.onSearchEvent.emit(this.searchText);
  }

  onFilter(evet: any) {
    console.log('Filter');
    this.onFilterEvent.emit(event); 
  }

  onView() {
    console.log('View');
    this.onViewEvent.emit();
  }

  onAddNew() {
    console.log('Add new');
    this.onAddNewEvent.emit(); 
  }

  onEdit() {
    console.log('Edit');
    this.onEditEvent.emit(); 
  }

  onDelete() {
    console.log('Delete');
    this.onDeleteEvent.emit(); 
  } 

  onSort() {
    console.log('Sort');
  } 

  getRouteByName(name: string): string | undefined {
    return this.routesData.find(route => route.name === name)?.url;
  }

}
