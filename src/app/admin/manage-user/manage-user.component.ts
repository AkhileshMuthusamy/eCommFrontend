import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../../shared/services/api.service';
import {Observable, of} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['firstName', 'dateCreated', 'email', 'phone'];
  dataSource = new MatTableDataSource<any>([]);
  dataLoading$: Observable<boolean> = of(false);
  totalLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService, ) { }

  ngOnInit(): void {

    this.dataSource.sort = this.sort;
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.dataLoading$ = of(true);
    this.apiService.getUsers().subscribe((response) => {
      this.dataLoading$ = of(false);
      if (!response.error) {
        this.dataSource.data = [...response.data];
      }
    });
  }
}
