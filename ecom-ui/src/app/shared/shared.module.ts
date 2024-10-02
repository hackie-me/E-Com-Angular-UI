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
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
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
    CheckoutComponent
  ]
})
export class SharedModule { }
