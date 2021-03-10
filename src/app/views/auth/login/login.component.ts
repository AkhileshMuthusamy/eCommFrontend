import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  text = 'SIGNIN';
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  isSuccess = false;
  isMessage: string;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    // private userService: UserService,
    private authService: AuthService
  ) {

    if (this.authService.hasUser()) {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   if (params && params.activate) {
    //     let message;
    //     if (params.activate === 'true') {
    //       message = 'User activated successfully.';
    //     }
    //     if (params.activate === 'false') {
    //       message = 'User activation link expired.';
    //     }

    //     setTimeout(() => {
    //       this._snackBar.open(message, 'close').onAction().subscribe(() => {
    //         this.router.navigate(['/']);
    //       });
    //     }, 0);
    //   }
    // });
  }

  createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rMe: [false]
    });

    if (localStorage.getItem('rMe') !== null) {
      this.loginForm.patchValue(JSON.parse(localStorage.getItem('rMe')));
    }
  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.router.navigate(['/dashboard']);
    return;

    this.submitted = true;
    this.isMessage = '';
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      if (this.loginForm.value.rMe) {
        localStorage.setItem('rMe', JSON.stringify(this.loginForm.value));
      } else {
        localStorage.removeItem('rMe');
      }

      this.authService.login(loginData)
        .subscribe(res => {
          if (res.isSuccess === false) {
            this.isMessage = res.message;
            this.submitted = false;

          } else {
            this.isSuccess = true;
            localStorage.setItem('user', JSON.stringify(res.data));
            this.authService.isLoginSubject.next(true);
            this.router.navigate(['/dashboard']);
          }


        });
    }
  }

}
