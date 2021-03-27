import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ApiService} from "../../shared/services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoading = false;
  profile = null;
  profileForm: FormGroup;

  countries = ['India', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Bangladesh', 'Belgium', 'Brazil',
               'Canada', 'Japan', 'Malaysia', 'Mauritius', 'Nepal', 'Pakistan', 'Qatar', 'Singapore', 'Sri Lanka', 'Vietnam', 'Zimbabwe'];

  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: NgbModal,
              private apiService: ApiService, private snackBar: MatSnackBar) {
    this.profileForm = this.fb.group({
      email: [{value: '', disabled: true}, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['USER'],
      address: [''],
      postcode: [''],
      city: [''],
      state: [''],
      country: [''],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.authService.getProfile());
  }

  get f(): any { return this.profileForm.controls; }

  openModal(): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      scrollable: false,
      centered: true
    };

    const modalRef = this.modalService.open(ChangePasswordComponent, ngbModalOptions);
    modalRef.componentInstance.role = 'USER';
    modalRef.componentInstance.email = this.profileForm.getRawValue().email;
    modalRef.result.then(() => {
    }).catch(() => {
    });
  }

  updateProfile(): void {
    this.isLoading = true;
    this.apiService.updateProfile(this.profileForm.getRawValue()).subscribe(response => {
      this.isLoading = false;
      if (!response.error) {
        this.snackBar.open('Profile updated successfully! Please logout and login to reflect the changes.', 'Close', {duration: 5000});
      }
    }, () => {
      this.isLoading = false;
    });
  }

}
