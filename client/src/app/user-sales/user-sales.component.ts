import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Sale } from '../models/sale.model';
import { AuthService } from '../service/auth.service';
import { SalesService } from '../service/sales.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.sass']
})
export class UserSalesComponent {
  user = this.userService.getUserById(this.auth.getCurrentUserId());
  sales$: Observable<Sale[]> = this.user.pipe(
    switchMap(user => this.salesService.getAllSalesByUserId(user.profil.id)),
  );
  displayedColumns = [
    'title',
    'type',
    'price',
    'shipping',
    'actions'
  ];

  constructor(
    private salesService: SalesService,
    private userService: UserService,
    private auth: AuthService
  ) { }

  deleteSale(id: number) {
    this.salesService.deleteSale(id).subscribe()
  }

  editSale(id: number) {
    //fake dto to test
    //TODO implement edit sale component
    const dto = {
      title: 'test',
      type: 'testt',
      message: 'oui mais non',
      pictureOne: 'qsdf',
      pictureTwo: 'qsdf',
      pictureThree: 'qsdf',
      price: 120,
      shipping: true,
    } as Sale
    this.salesService.editSale(id, dto).subscribe();
  }

}
