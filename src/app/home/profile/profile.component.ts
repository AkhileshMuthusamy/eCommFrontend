import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isEdit = false;
  profile = null;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: NgbModal) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['USER']
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.authService.getProfile());
    this.profileForm.disable();
  }

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

}
