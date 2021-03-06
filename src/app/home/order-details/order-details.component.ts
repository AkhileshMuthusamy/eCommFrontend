import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditReviewComponent} from "../my-order/add-edit-review/add-edit-review.component";
import {ApiService} from "../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  isLoading = false;
  @Input() data = null;
  displayedColumns: string[] = ['name', 'quantity', 'sellingPrice', 'grandPrice', 'actions'];
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

  openModal(isEdit, product): void {

    if (!product) {
      return;
    }

    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true,
    };

    const modalRef = this.modalService.open(AddEditReviewComponent, ngbModalOptions);
    modalRef.componentInstance.isEdit = isEdit;
    modalRef.componentInstance.productInfo = product;
    modalRef.componentInstance.orderInfo = this.data;
    modalRef.result.then(() => {
      this.activeModal.close();
    }).catch(() => {
    });
  }

  cancelOrder(): void {
    this.isLoading = true;
    this.apiService.userCancelOrder(this.data._id).subscribe(response => {
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
