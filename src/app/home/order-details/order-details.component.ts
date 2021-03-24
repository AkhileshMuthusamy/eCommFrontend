import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from "@angular/material/table";
import {AddEditReviewComponent} from "../my-order/add-edit-review/add-edit-review.component";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() data = null;
  displayedColumns: string[] = ['name', 'quantity', 'grandPrice', 'sellingPrice', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {
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


}
