import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {APIResponse} from '../Objects/api-response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;
  private USER_TOKEN = 'uid';
  private USER_LOGGED_IN_KEY = 'login_user_key';
  private USER_CONS_STATUS = 'login_user_cons_status';
  private USER_IS_ADMIN = 'login_user_is_admin';



  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  constructor(private router: Router, private http: HttpClient) {
  }

  public getToken(): string {
    return sessionStorage.getItem(this.USER_TOKEN);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public isUserLoggedIn(): boolean {
    const userLoggedIn = this.getToken() != null && this.getToken() !== '';
    if (!userLoggedIn) {
      this.isLoginSubject.next(false);
    }
    return userLoggedIn;
  }

  login(data: User): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}login`, data);
  }

  register(data: User): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}register`, data);
  }

  storeToken(uid): void {
    sessionStorage.setItem(this.USER_TOKEN, uid);
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_TOKEN);
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']).then(() => {});
  }

  public logoutAndNavigate(): void {
    this.logout();
    this.router.navigate(['/login']).then(() => {});
  }

  hasUser(): boolean {
    return !!sessionStorage.getItem(this.USER_TOKEN);
  }
}


export interface User {
  email: string;
  password: string;
  role: string;
}
