import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../shared/services/user-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {CartProduct} from '../../shared/Objects/global-obj';
import {ApiService} from "../../shared/services/api.service";
import {AuthService} from "../../shared/services/auth.service";
import {MatHorizontalStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderComplete = false;
  orderId = null;
  isEditable = true;
  isLoading = false;

  addressForm: FormGroup;
  paymentForm: FormGroup;

  displayedColumns: string[] = ['name', 'quantity', 'grandPrice', 'sellingPrice'];
  dataSource = new MatTableDataSource<CartProduct>([]);

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(private router: Router, public userDataService: UserDataService,
              private fb: FormBuilder, private apiService: ApiService, private authService: AuthService) {
    this.addressForm = this.fb.group({
      address: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.paymentForm = this.fb.group({
      type: ['COD', [Validators.required]],
      cardNo: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userDataService.cartListSubject.subscribe(cartList => {
      this.dataSource.data = [...cartList];
    });

    if (this.authService.isLoginSubject.getValue() === false) {
      this.navigate('/login');
    } else {
      this.addressForm.patchValue(this.authService.getProfile());
    }
  }

  navigate(path): void {
    this.router.navigate([path]).then(() => {});
  }

  createOrder(): void {
    this.isLoading = true;
    const profile = this.authService.getProfile();
    const data = {
      products: this.userDataService.cartList,
      payment: this.paymentForm.getRawValue(),
      shippingAddress: this.addressForm.getRawValue(),
      email: profile ? profile.email : '',
      totalAmount: this.userDataService.cartSubTotal(),
    };
    console.log(data);
    this.apiService.createOrder(data).subscribe(response => {
      if (!response.error) {
        this.orderComplete = true;
        this.orderId = response.data._id;
        this.userDataService.clearCart();
      }
      this.isLoading = false;
    }, () => {
      this.stepper.selectedIndex = 0;
      this.isLoading = false;
    });
  }

}
