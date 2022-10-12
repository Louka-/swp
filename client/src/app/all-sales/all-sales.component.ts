import { CreateDateColumn } from 'typeorm';
import { Component, Injectable, OnInit } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
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
export class AllSalesComponent implements OnInit {
  profils: Profil[] = [];

  sales: Sale[] = [];

  constructor(
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
    this.profilService.getAllUsersProfil().pipe(
      map(profils => this.profils = profils),
      map(profils => profils.forEach(profil => profil.sales.forEach(sale => this.sales.push(sale)))),
    ).subscribe();
  }

  geProfilInfos(sale: Sale): Profil | undefined {
    const profil = this.profils.find(profil => profil.id === sale.profilId)
    return profil;
  }

  sortSales(sales: Sale[]): Sale[] {
    return sales.sort((objA, objB) => new Date(objB.createdAt).getTime() - new Date(objA.createdAt).getTime());
  }

}
