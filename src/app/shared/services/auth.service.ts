import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

    constructor(private http: HttpClient) {
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    login(value) {
        return this.http.post<any>('Account/login', value);
    }


    logout(): void {
        localStorage.removeItem('user');
        this.isLoginSubject.next(false);
    }

    hasUser(): boolean {
        return !!localStorage.getItem('user');
    }
}
