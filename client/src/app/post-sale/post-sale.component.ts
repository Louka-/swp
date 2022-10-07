import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { SalesService } from '../service/sales.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { switchMap } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../models/sale.model';
import { UserSalesComponent } from '../user-sales/user-sales.component';

@Component({
  selector: 'app-post-sale',
  templateUrl: './post-sale.component.html',
  styleUrls: ['./post-sale.component.sass']
})
export class PostSaleComponent implements OnInit {
  saleForm?: FormGroup;

  sale?: Sale;

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
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserSalesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.sale = data.sale;
  }

  ngOnInit(): void {
    this.saleForm = this.fb.group({
      sale: [this.sale, []]
    });
  }

  validate(form: NgForm) {
    this.userService.getUserById(this.auth.getCurrentUserId()).pipe(
      switchMap(user => this.saleService.postSale(form.value, user.profil.id))
    ).subscribe();
    this.router.navigate(['all-sales']);
  }

  updateSale(id: number, form: NgForm) {
    this.saleService.editSale(id, form.value).subscribe();
    this.dialogRef.close();
  }

}
