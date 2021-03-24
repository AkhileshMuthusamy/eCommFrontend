import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../shared/services/user-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {CartProduct} from '../../shared/Objects/global-obj';
import {ApiService} from '../../shared/services/api.service';
import {AuthService} from '../../shared/services/auth.service';
import {MatHorizontalStepper} from '@angular/material/stepper';

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
      cardNo: [''],
      cvv: [''],
      month: [''],
      year: [''],
      name: ['']
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

    if (this.userDataService.cartList.length === 0) {
      this.navigate('/');
    }

    this.paymentForm.controls.type.valueChanges.subscribe(value => {
      if (value === 'C/D') {
        this.paymentForm.controls.cardNo.setValidators([Validators.required, Validators.minLength(16)]);
        this.paymentForm.controls.cvv.setValidators([Validators.required, Validators.minLength(3)]);
        this.paymentForm.controls.month.setValidators([Validators.required, Validators.minLength(2)]);
        this.paymentForm.controls.year.setValidators([Validators.required, Validators.minLength(2)]);
      } else {
        this.paymentForm.controls.cardNo.setValidators(null);
        this.paymentForm.controls.cvv.setValidators(null);
        this.paymentForm.controls.month.setValidators(null);
        this.paymentForm.controls.year.setValidators(null);
      }
      this.paymentForm.controls.cardNo.updateValueAndValidity();
      this.paymentForm.controls.cvv.updateValueAndValidity();
      this.paymentForm.controls.month.updateValueAndValidity();
      this.paymentForm.controls.year.updateValueAndValidity();
    });
  }

  navigate(path): void {
    this.router.navigate([path]).then(() => {});
  }

  get f(): any { return this.paymentForm.controls; }

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
