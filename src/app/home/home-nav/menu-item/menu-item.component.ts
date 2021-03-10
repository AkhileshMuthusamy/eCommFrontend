import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavItem } from "../nav-item";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() items: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu: any;

  constructor() {  }

  ngOnInit(): void {
    console.log(this.items);
  }

}
