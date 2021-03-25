import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../shared/services/api.service';
import {Observable, of} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";

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

  constructor(private apiService: ApiService, ) { }

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

}
