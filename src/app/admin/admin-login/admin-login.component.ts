import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  text = 'SIGNIN';
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  isLoading = false;
  isSuccess = false;
  isMessage: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {

    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ADMIN']
    });

    if (localStorage.getItem('rMe') !== null) {
      this.loginForm.patchValue(JSON.parse(localStorage.getItem('rMe')));
    }
  }

  get f(): any { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.getRawValue()).subscribe(res => {
        if (!res.error) {
          this.submitted = false;
          this.authService.storeAdminInfo(res.data);
          this.authService.isAdminLoginSubject.next(true);
          this.router.navigate(['/admin']).then(() => {});
        } else {
          this.snackBar.open(res.message || 'Unable to login', 'Close', {duration: 2000});
        }
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
        console.log(err.error.message);
        this.snackBar.open( err.error.message || 'Error while connecting. Please try again.', 'Close', {duration: 2000});
      });
    }
  }

}
