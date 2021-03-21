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
  private USER_PROFILE = 'profile';
  private ADMIN_TOKEN = 'aid';
  private ADMIN_PROFILE = 'a_profile';
  private CART = 'cart';


  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());
  isAdminLoginSubject = new BehaviorSubject<boolean>(this.hasAdmin());

  constructor(private router: Router, private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem(this.USER_TOKEN);
  }

  public getProfile(): any {
    return JSON.parse(localStorage.getItem(this.USER_PROFILE));
  }

  public getAdminProfile(): any {
    return JSON.parse(localStorage.getItem(this.ADMIN_PROFILE));
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
    return this.http.post<any>(`${this.apiURL}user/login`, data);
  }

  register(data: User): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}user/register`, data);
  }

  changePassword(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}user/change-password`, data);
  }

  storeUserInfo(data): void {
    localStorage.setItem(this.USER_TOKEN, data.token);
    localStorage.setItem(this.USER_PROFILE, JSON.stringify(data.profile));
  }

  storeAdminInfo(data): void {
    localStorage.setItem(this.ADMIN_TOKEN, data.token);
    localStorage.setItem(this.ADMIN_PROFILE, JSON.stringify(data.profile));
  }

  logout(): void {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.removeItem(this.USER_PROFILE);
    localStorage.removeItem(this.CART);
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']).then(() => {});
  }

  adminLogout(): void {
    localStorage.removeItem(this.ADMIN_TOKEN);
    localStorage.removeItem(this.ADMIN_PROFILE);
    this.isAdminLoginSubject.next(false);
    this.router.navigate(['/admin/login']).then(() => {});
  }

  public logoutAndNavigate(): void {
    this.logout();
    this.router.navigate(['/login']).then(() => {});
  }

  hasUser(): boolean {
    return !!localStorage.getItem(this.USER_TOKEN);
  }

  hasAdmin(): boolean {
    return !!localStorage.getItem(this.ADMIN_TOKEN);
  }
}


export interface User {
  email: string;
  password: string;
  role: string;
}
