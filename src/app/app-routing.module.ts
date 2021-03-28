import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeProductsComponent} from './home-products/home-products.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProfileComponent} from './home/profile/profile.component';
import {MainLayoutComponent} from './admin/main-layout/main-layout.component';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {ManageCategoryComponent} from './admin/manage-category/manage-category.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {ManageProductComponent} from './admin/manage-product/manage-product.component';
import {ManageOrderComponent} from './admin/manage-order/manage-order.component';
import {MyCartComponent} from './home/my-cart/my-cart.component';
import {CheckoutComponent} from './home/checkout/checkout.component';
import {MyOrderComponent} from './home/my-order/my-order.component';
import {CategoryProductsComponent} from './home/category-products/category-products.component';
import {SearchProductsComponent} from './home/search-products/search-products.component';
import {ManageUserComponent} from './admin/manage-user/manage-user.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product'
      },
      {
        path: 'product',
        component: HomeProductsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'cart',
        component: MyCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'order',
        component: MyOrderComponent
      },
      {
        path: 'category/:id',
        component: CategoryProductsComponent
      },
      {
        path: 'search/:s',
        component: SearchProductsComponent
      },
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin', component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {path: 'login', component: AdminLoginComponent},
      {path: 'category', component: ManageCategoryComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'product', component: ManageProductComponent},
      {path: 'order', component: ManageOrderComponent},
      {path: 'user', component: ManageUserComponent},
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
