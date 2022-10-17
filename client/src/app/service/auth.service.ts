import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/user.model';

const API_LOGIN = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({
    id: 0,
    email: '',
    password: '',
  });

  constructor(
    private http: HttpClient,
  ) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_LOGIN}/login`, credentials, { withCredentials: true });
  }

  logout() {
    localStorage.removeItem('current-user');
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${API_LOGIN}/register`, credentials);
  }

  isAutheticated() {
    return !!localStorage.getItem('current-user');
  }

  saveUserToLocalStorage(user: CurrentUser) {
    this.userProfile.next(user);
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  loadUserFromLocalStorage(): CurrentUser {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('current-user');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  refreshCookie() {
    return this.http.get(`${API_LOGIN}/refresh-token`, {
      withCredentials: true,
    });
  }

}
