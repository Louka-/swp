import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale.model';

const API_SALES = 'http://localhost:3000/sale';
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${API_SALES}/all`);
  }
}
