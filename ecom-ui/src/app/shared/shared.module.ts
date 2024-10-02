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
import { ProductQuickViewComponent } from './components/modal/product-quick-view/product-quick-view.component';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';



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
    ProductQuickViewComponent,
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
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
    ProductQuickViewComponent,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
