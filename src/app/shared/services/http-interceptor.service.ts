import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

// import {ToastrService} from 'ngx-toastr';
import { AuthService } from './auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(protected router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedIn()) {
      if (req.body instanceof FormData) {
        req = req.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Accept: 'application/json',
            Authorization: `${this.authService.getToken()}`,
          },
        });
      } else {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Accept: 'application/json',
            Authorization: `${this.authService.getToken()}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.success) {

          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            // this.toaster.error(error.error.responseMessage, 'Error', {closeButton: true});
            this.snackBar.open( error.error.responseMessage, 'Close', {duration: 2000});
          } else if (error.status === 0) {
            // this.toaster.error('Unknown error occurred', 'Error', {closeButton: true});
            this.snackBar.open( 'Unknown error occurred', 'Close', {duration: 2000});
          } else if (error.status === 401) {
            this.authService.logoutAndNavigate();
          } else {
            // this.toaster.error(error.statusText, 'Error', {closeButton: true});
            this.snackBar.open( error.statusText, 'Close', {duration: 2000});
          }
        }
        return throwError(error);
      })
    );
  }
}
