import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../shared/Objects/global-obj';
import {UserDataService} from '../shared/services/user-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() productInfo: Product = null;

  constructor(private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
  }

  navigate(): void {
    this.router.navigate(['/product-detail'], { queryParams: { id: this.productInfo._id }}).then(() => {});
  }

  addToCart(): void {
    this.userDataService.addProductToCart(this.productInfo);
  }

}
