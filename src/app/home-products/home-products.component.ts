import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {

  recentProducts = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
  };

  constructor(private apiService: ApiService) {
    this.loadRecentProducts();
  }

  ngOnInit(): void {
  }

  loadRecentProducts(): void {
    this.apiService.getRecentProducts().subscribe((response) => {
      if (!response.error) {
        this.recentProducts = response.data;
      }
    });
  }
}
