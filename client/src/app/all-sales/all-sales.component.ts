import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sales = this.salesService.getAllSales();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['connexion']);
  }

}
