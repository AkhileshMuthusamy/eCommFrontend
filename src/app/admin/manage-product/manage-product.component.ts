import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Product} from '../../shared/Objects/global-obj';
import {ApiService} from '../../shared/services/api.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'SKU', 'sellingPrice', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  dataLoading$: Observable<boolean> = of(false);
  totalLength = 0;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
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

  editProduct(SKU: string): void {

  }

  deleteProduct(SKU: string): void {

  }
}
