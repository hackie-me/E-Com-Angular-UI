import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { TopBarComponent } from './components/header/top-bar/top-bar.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { CopyRightComponent } from './components/footer/copy-right/copy-right.component';
import { RouterLink, RouterOutlet, RouterLinkActive, RouterModule } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoginComponent } from './components/login/login.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminSidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminHeaderComponent } from './components/admin/header/admin-header.component';
import { AdminBreadcrumbComponent } from './components/admin/admin-breadcrumb/admin-breadcrumb.component';
import { AdminGridComponent } from './components/admin/grid/admin-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';



@NgModule({
  declarations: [
    FooterComponent,
    CopyRightComponent,
    HeaderComponent,
    TopBarComponent,
    NavbarComponent,
    LoaderComponent,
    PageNotFoundComponent,
    ProductItemComponent,
    BreadCrumbComponent,
    AboutComponent,
    ContactComponent,
    ContactComponent,
    PaginationComponent,
    LoginComponent,
    WishlistComponent,
    CheckoutComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminBreadcrumbComponent,
    AdminGridComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    FooterComponent,
    CopyRightComponent,
    HeaderComponent,
    TopBarComponent, 
    NavbarComponent,
    LoaderComponent,
    PageNotFoundComponent,
    ProductItemComponent,
    BreadCrumbComponent,
    AboutComponent,
    ContactComponent,
    PaginationComponent,
    LoginComponent,
    WishlistComponent,
    CheckoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminBreadcrumbComponent,
    AdminGridComponent,
    AdminFormComponent
  ]
})
export class SharedModule { }
