import { Component, Injectable, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Profil } from '../models/profil.model';
import { Sale } from '../models/sale.model';
import { ProfilService } from '../service/profil.service';
import { SalesService } from '../service/sales.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.sass']
})

@Injectable()
export class AllSalesComponent {

  profils$: Observable<Profil[]> = this.profilService.getAllUsersProfil();

  constructor(
    private profilService: ProfilService,
  ) { }

}
