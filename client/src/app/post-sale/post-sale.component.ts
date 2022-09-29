import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../service/sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-sale',
  templateUrl: './post-sale.component.html',
  styleUrls: ['./post-sale.component.sass']
})
export class PostSaleComponent implements OnInit {
  types = [
    { type: "armure" },
    { type: "arme" },
    { type: "accessoire" },
    { type: "autre" },
  ]

  constructor(
    private saleService: SalesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validate(form: NgForm) {
    this.saleService.postSale(form.value).subscribe();
    this.router.navigate(['all-sales']);
  }

}
