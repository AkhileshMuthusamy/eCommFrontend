import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {CartProduct} from '../../shared/Objects/global-obj';
import {UserDataService} from '../../shared/services/user-data.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['name', 'sellingPrice', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<CartProduct>([]);

  constructor(private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.cartListSubject.subscribe(cartList => {
      this.dataSource.data = [...cartList];
    });
  }

  navigate(path): void {
    this.router.navigate([path]).then(() => {});
  }

  removeProduct(SKU: string): void {

  }
}
