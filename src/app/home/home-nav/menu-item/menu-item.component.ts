import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavItem } from '../nav-item';
import {UserDataService} from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() items: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor(private userDataService: UserDataService) {  }

  ngOnInit(): void {
    console.log(this.items);
  }

}
