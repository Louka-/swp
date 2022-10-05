import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { SalesService } from '../service/sales.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-post-sale',
  templateUrl: './post-sale.component.html',
  styleUrls: ['./post-sale.component.sass']
})
export class PostSaleComponent {

  types = [
    { type: "armure" },
    { type: "arme" },
    { type: "accessoire" },
    { type: "autre" },
  ]

  constructor(
    private saleService: SalesService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  validate(form: NgForm) {
    this.userService.getUserById(this.auth.getCurrentUserId()).pipe(
      switchMap(user => this.saleService.postSale(form.value, user.profil.id))
    ).subscribe();
    this.router.navigate(['all-sales']);
  }

}
