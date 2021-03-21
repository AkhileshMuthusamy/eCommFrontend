import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  products = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService, ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.loadCategoryProducts(params.id);
    });
  }

  loadCategoryProducts(id: string): void {
    this.apiService.getCategoryProducts(id).subscribe((response) => {
      if (!response.error) {
        this.products = response.data;
      }
    });
  }

}
