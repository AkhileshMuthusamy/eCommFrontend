import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'orderDate', 'email', 'status'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private apiService: ApiService, ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe((response) => {
      if (!response.error) {
        this.dataSource.data = [...response.data];
      }
    });
  }

}
