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
    private http: HttpClient,
  ) { }

  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${API_SALES}/all`);
  }

  getAllSalesByUserId(id: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${API_SALES}/allByUser/${id}`);
  }

  postSale(dto: Sale, profilId: number): Observable<Sale> {
    return this.http.post<Sale>(`${API_SALES}/create/${profilId}`, dto);
  }

  editSale(id: number, dto: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${API_SALES}/edit/${id}`, dto);
  }

  deleteSale(id: number) {
    return this.http.delete<Sale>(`${API_SALES}/delete/${id}`);
  }
}
