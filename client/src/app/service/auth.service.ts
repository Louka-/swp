import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

const API_LOGIN = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_LOGIN}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${API_LOGIN}/register`, credentials);
  }

  isAutheticated() {
    return !!localStorage.getItem('jwt');
  }

  getCurrentUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  findUserByEmail(): Observable<ValidationErrors | null> {
    return new Observable<ValidationErrors | null>(
      (observer) => {
        setTimeout(
          () => {
            const date = new Date();
            if (date.getTime() % 2) {
              observer.next(null);
            } else {
              observer.next({ userExists: true });
            }
          },
          1500
        );
      }
    );
  }
}
