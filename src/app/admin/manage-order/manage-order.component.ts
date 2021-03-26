import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../shared/services/api.service';
import {Observable, of} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AdminOrderDetailComponent} from './admin-order-detail/admin-order-detail.component';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['_id', 'orderDate', 'email', 'status'];
  dataSource = new MatTableDataSource<any>([]);
  dataLoading$: Observable<boolean> = of(false);
  totalLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe((response) => {
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

    const modalRef = this.modalService.open(AdminOrderDetailComponent, ngbModalOptions);
    modalRef.componentInstance.data = order;
    modalRef.result.then(() => {
      this.loadOrders();
    }).catch(() => {
    });
  }

}
