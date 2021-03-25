import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Product} from '../../shared/Objects/global-obj';
import {ApiService} from '../../shared/services/api.service';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AddProductComponent} from './add-product/add-product.component';
import {MatPaginator} from "@angular/material/paginator";
import {EditProductComponent} from "./edit-product/edit-product.component";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, AfterViewInit {

  isLoading = false;
  displayedColumns: string[] = ['name', 'SKU', 'sellingPrice', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  dataLoading$: Observable<boolean> = of(false);
  totalLength = 0;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              private modalService: NgbModal) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(): void {
    this.dataLoading$ = of(true);
    this.apiService.getProducts().subscribe(response => {
      if (!response.error) {
        this.dataSource.data = response.data;
        this.totalLength = response.data.length;
      }
      this.dataLoading$ = of(false);
    });
  }

  addProduct(): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true
    };

    const modalRef = this.modalService.open(AddProductComponent, ngbModalOptions);
    modalRef.result.then(() => {
      this.loadProducts();
    }).catch(() => {
    });
  }

  editProduct(product): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true
    };

    const modalRef = this.modalService.open(EditProductComponent, ngbModalOptions);
    modalRef.componentInstance.productInfo = product;
    modalRef.result.then(() => {
      this.loadProducts();
    }).catch(() => {
    });
  }

  deleteProduct(SKU: string): void {
    if (SKU) {
      this.isLoading = true;

      this.apiService.deleteProduct(SKU).subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.snackBar.open(response.message || 'Product deleted successfully!', 'Close', {duration: 2000});
          this.loadProducts();
        }
      }, () => {
        this.isLoading = false;
      });
    }
  }
}
