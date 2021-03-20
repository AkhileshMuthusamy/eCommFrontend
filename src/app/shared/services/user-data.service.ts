import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CartProduct, Product} from '../Objects/global-obj';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private readonly CART = 'cart';

  cartList: Array<CartProduct> = [];
  cartListSubject = new BehaviorSubject<Array<CartProduct>>(this.getCartFromStorage());

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.cartList = this.getCartFromStorage();
  }

  getCartFromStorage(): Array<any> {
    return JSON.parse(localStorage.getItem(this.CART)) || [];
  }

  addProductToCart(product: Product): void {
    const pd = this.cartList.filter(cartProduct => {
      return cartProduct._id === product._id;
    });

    if (pd.length === 0) {
      this.cartList.push({
        _id: product._id,
        name: product.name,
        quantity: 1,
        sellingPrice: product.sellingPrice,
        grandPrice: product.sellingPrice
      });
      this.snackBar.open( 'Product added to cart', 'Close', {duration: 2000});
    } else {
      pd[0].quantity += 1;
      pd[0].grandPrice *= pd[0].quantity;
      this.snackBar.open( 'Increased product quantity in cart', 'Close', {duration: 2000});
    }

    this.storeCartInStorage();
    console.log(this.cartList);
  }

  storeCartInStorage(): void {
    this.cartListSubject.next(this.cartList);
    localStorage.setItem(this.CART, JSON.stringify(this.cartList));
  }
}
