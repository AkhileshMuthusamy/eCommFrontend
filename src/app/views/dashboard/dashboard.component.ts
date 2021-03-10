import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchListComponent } from './search-list/search-list.component';

@Component({
  selector: 'mci-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tabs = [{accno: 0, name: 'Porfolio Manager'}];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  openSearchListDialog() {
    const dialogRef = this.dialog.open(SearchListComponent);

    dialogRef.afterClosed().subscribe((result: Array<any>) => {
      console.log(`Dialog result:`, result);

      this.tabs = [
        ...this.tabs,
        ...result.filter(user => {
        return !this.tabs.includes(user);
      })];
    });
  }
}
