import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() role = 'USER';
  @Input() email = null;
  changePasswordForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private fb: FormBuilder,
              public activeModal: NgbActiveModal) {
    this.changePasswordForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      role: [this.role]
    });
  }

  ngOnInit(): void {
    this.changePasswordForm.controls.email.patchValue(this.email);
    this.changePasswordForm.controls.role.patchValue(this.role);
  }

  updatePassword(): void {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this.authService.changePassword(this.changePasswordForm.getRawValue()).subscribe(response => {
        this.isLoading = false;
        if (!response.error) {
          this.snackBar.open(response.message || 'Password updated successfully!', 'Close', {duration: 2000});
          this.activeModal.close();
        }
      }, () => {
        this.isLoading = false;
      });

    }
  }

}
