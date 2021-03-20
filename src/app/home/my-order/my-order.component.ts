import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {AuthService} from '../../shared/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  orderList = [];
  displayedColumns: string[] = ['_id', 'orderDate', 'status'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getUserOrders(this.authService.getProfile().email).subscribe((response) => {
      if (!response.error) {
        this.dataSource.data = [...response.data];
      }
    });
  }

}
