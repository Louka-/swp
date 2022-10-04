import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_PROFIL = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_PROFIL}/one/${id}`);
  }

}
