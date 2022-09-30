import { Component, Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sale } from '../models/sale.model';
import { SalesService } from '../service/sales.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.sass']
})

@Injectable()
export class AllSalesComponent implements OnInit {
  sales: Observable<Sale[]> | undefined;

  images = [
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      imageAlt: 'test'
    },
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'test'
    },
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba3.jpg',
      imageAlt: 'test'
    },
  ];

  constructor(
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.sales = this.salesService.getAllSales().pipe(
      map(sales => sales.reverse())
    );
  }

}
