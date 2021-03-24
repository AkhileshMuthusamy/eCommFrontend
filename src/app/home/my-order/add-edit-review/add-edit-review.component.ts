import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../shared/services/api.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.scss']
})
export class AddEditReviewComponent implements OnInit {

  @Input() isEdit = false;
  @Input() productInfo = null;
  @Input() orderInfo = null;

  isLoading = false;
  reviewForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private apiService: ApiService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      title: [null, [Validators.required]],
      message: [null, [Validators.required]],
      productId: [null],
      orderId: [null]
    });

    if (this.isEdit) {
      this.reviewForm.patchValue(this.productInfo);
    }
  }

  get f(): any { return this.reviewForm.controls; }

  onSave(): void {
    if (this.isEdit) {
      this.editReview();
    } else {
      this.addReview();
    }
  }

  addReview(): void {
    const data = {
      productId: this.productInfo._id,
      orderId: this.orderInfo._id,
      orderReviewData: {
        rating: this.reviewForm.get('rating').value,
        title: this.reviewForm.get('title').value,
        message: this.reviewForm.get('message').value,
      },
      productReviewData: {
        rating: this.reviewForm.get('rating').value,
        title: this.reviewForm.get('title').value,
        message: this.reviewForm.get('message').value,
        orderId: this.orderInfo._id,
        username: `${this.authService.getProfile().firstName} ${this.authService.getProfile().lastName}`
      }
    };
    console.log(data);
    this.isLoading = true;
    this.apiService.addReview(data).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.activeModal.close();
      }
    }, () => {
      this.isLoading = false;
    });
  }

  editReview(): void {
    const data = {
      productId: this.productInfo._id,
      orderId: this.orderInfo._id,
      orderReviewData: {
        rating: this.reviewForm.get('rating').value,
        title: this.reviewForm.get('title').value,
        message: this.reviewForm.get('message').value,
      },
      productReviewData: {
        rating: this.reviewForm.get('rating').value,
        title: this.reviewForm.get('title').value,
        message: this.reviewForm.get('message').value,
        orderId: this.orderInfo._id,
        username: `${this.authService.getProfile().firstName} ${this.authService.getProfile().lastName}`
      }
    };
    this.isLoading = true;
    this.apiService.updateReview(data).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.activeModal.close();
      }
    }, () => {
      this.isLoading = false;
    });
  }

}
