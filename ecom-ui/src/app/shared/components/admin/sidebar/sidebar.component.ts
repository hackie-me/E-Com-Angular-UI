import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class AdminSidebarComponent {
isDropdownOpen: { [key: string]: boolean } = {
    ecommerce: false,
    category: false,
    attributes: false,
    order: false,
    user: false,
    location: false
  };

  toggleDropdown(evt: any, menu: string): void {
    evt.preventDefault(); 
    // Close other dropdowns
    for (const key in this.isDropdownOpen) {
      if (key !== menu) {
        this.isDropdownOpen[key] = false;
      }
    }
    // Toggle the selected menu
    this.isDropdownOpen[menu] = !this.isDropdownOpen[menu];
  }
}
