import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../../shared/services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ship-order',
  templateUrl: './ship-order.component.html',
  styleUrls: ['./ship-order.component.scss']
})
export class ShipOrderComponent implements OnInit {

  isLoading = false;
  @Input() id = null;
  @Input() email = null;

  shipOrderForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.shipOrderForm = this.fb.group({
      status: ['SHIPPED'],
      shipDate: [new Date()],
      trackingNumber: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  shipOrder(): void {
    this.isLoading = true;
    if (!this.shipOrderForm.valid) {
      return;
    }
    this.apiService.shipOrder({_id: this.id, email: this.email, data: this.shipOrderForm.getRawValue()}).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.snackBar.open(response.message || 'Shipping details saved successfully!', 'Close', {duration: 2000});
        this.activeModal.close();
      }
    }, () => {
      this.isLoading = false;
    });
  }

}
