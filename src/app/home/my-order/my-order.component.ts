import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {AuthService} from '../../shared/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {OrderDetailsComponent} from "../order-details/order-details.component";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  orderList = [];
  displayedColumns: string[] = ['_id', 'orderDate', 'status'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private apiService: ApiService, private authService: AuthService, private modalService: NgbModal) { }

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

  openModal(order): void {

    if (!order) {
      return;
    }

    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true,
      size: 'lg'
    };

    const modalRef = this.modalService.open(OrderDetailsComponent, ngbModalOptions);
    modalRef.componentInstance.data = order;
    modalRef.result.then(() => {
    }).catch(() => {
    });
  }

}
