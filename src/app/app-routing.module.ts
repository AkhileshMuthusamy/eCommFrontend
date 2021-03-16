import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeProductsComponent} from './home-products/home-products.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProfileComponent} from "./home/profile/profile.component";


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
      }
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
