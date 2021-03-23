import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Input() data = null;
  displayedColumns: string[] = ['name', 'quantity', 'grandPrice', 'sellingPrice', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = [...this.data.products];
    }
    console.log(this.dataSource.data)
  }

}
