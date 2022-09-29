import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sale } from '../models/sale.model';
import { AuthService } from '../service/auth.service';
import { SalesService } from '../service/sales.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.sass']
})

@Injectable()
export class AllSalesComponent implements OnInit {
  sales: Observable<Sale[]> | undefined;

  constructor(
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.sales = this.salesService.getAllSales().pipe(
      map(sales => sales.reverse())
    );
  }



}
