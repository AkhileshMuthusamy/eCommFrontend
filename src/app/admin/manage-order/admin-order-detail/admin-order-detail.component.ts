import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {NgbActiveModal, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ShipOrderComponent} from './ship-order/ship-order.component';
import {ApiService} from "../../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {

  isLoading = false;
  @Input() data = null;
  displayedColumns: string[] = ['name', 'quantity', 'sellingPrice', 'grandPrice'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private apiService: ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = [...this.data.products];
    }
    console.log(this.dataSource.data);
  }

  openModal(): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true,
    };

    const modalRef = this.modalService.open(ShipOrderComponent, ngbModalOptions);
    modalRef.componentInstance.id = this.data?._id;
    modalRef.componentInstance.email = this.data?.email;
    modalRef.result.then(() => {
      this.activeModal.close();
    }).catch(() => {
    });
  }

  cancelOrder(): void {
    this.isLoading = true;
    this.apiService.adminCancelOrder(this.data._id).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.snackBar.open(response.message || 'Order cancelled successfully!', 'Close', {duration: 2000});
        this.activeModal.close();
      }
    }, () => {
      this.isLoading = false;
    });
  }

}
