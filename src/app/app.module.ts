import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeProductsComponent} from './home-products/home-products.component';
import {HomeNavComponent} from './home/home-nav/home-nav.component';
import {MenuItemComponent} from './home/home-nav/menu-item/menu-item.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {GalleryModule} from 'ng-gallery';
import {LightboxModule} from 'ng-gallery/lightbox';
import {HttpInterceptorService} from './shared/services/http-interceptor.service';
import {ProfileComponent} from './home/profile/profile.component';
import {MainLayoutComponent} from './admin/main-layout/main-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';
import {DragDropDirective} from './shared/directives/drag-drop.directive';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { AddEditCategoryComponent } from './admin/manage-category/add-edit-category/add-edit-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavComponent,
    MenuItemComponent,
    LoginComponent,
    RegisterComponent,
    HomeProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProfileComponent,
    MainLayoutComponent,
    AdminLoginComponent,
    FileUploadComponent,
    DragDropDirective,
    ManageCategoryComponent,
    AddEditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    GalleryModule,
    LightboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
