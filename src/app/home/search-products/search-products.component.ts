import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  products = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService, ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.searchProducts(params.s);
    });
  }

  searchProducts(s: string): void {
    this.apiService.searchProducts(s).subscribe((response) => {
      if (!response.error) {
        this.products = response.data;
      }
    });
  }

}
