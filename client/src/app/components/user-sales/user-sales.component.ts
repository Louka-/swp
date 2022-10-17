import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Sale } from '../../models/sale.model';
import { AuthService } from '../../service/auth.service';
import { SalesService } from '../../service/sales.service';
import { MatDialog } from '@angular/material/dialog';
import { PostSaleComponent } from '../post-sale/post-sale.component';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.sass']
})
export class UserSalesComponent implements OnInit, AfterViewInit {
  user$ = this.userService.getUserById(this.auth.loadUserFromLocalStorage().id);
  sales$?: Observable<Sale[]>;
  displayedColumns = [
    'title',
    'type',
    'price',
    'shipping',
    'actions'
  ];

  // sales: Sale[] = [];
  // @ViewChild(MatPaginator) paginator?: MatPaginator;
  // totalRecords = 0;

  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.sales$ = this.user$.pipe(
      switchMap(user => this.salesService.getAllSalesByUserId(user.profil.id)),
    );
  }

  ngAfterViewInit() {
    // this.pageChange();
    // this.initialLoad();
  }

  // initialLoad() {
  //   let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
  //   this.salesService.getAllSalesPagination(currentPage, (this.paginator?.pageSize ?? 0))
  //     .subscribe(result => {
  //       this.totalRecords = result.totalCount;
  //       this.sales = result.data;
  //     })
  // }

  // pageChange() {
  //   this.paginator?.page.pipe(
  //     switchMap(() => {
  //       let currentPage = (this.paginator?.pageIndex ?? 0) + 1;
  //       return this.salesService.getAllSalesPagination(currentPage, (this.paginator?.pageSize ?? 0));
  //     }),
  //     map(result => {
  //       if (!result) {
  //         return [];
  //       }
  //       this.totalRecords = result.totalCount;
  //       return result.data;
  //     })
  //   )
  //     .subscribe(data => {
  //       this.sales = data;
  //     });
  // }

  deleteSale(id: number) {
    this.salesService.deleteSale(id).subscribe();
    this.ngOnInit();
  }

  editSale(sale: Sale) {
    this.dialog.open(PostSaleComponent, {
      height: '100%',
      data: {
        sale: sale,
      }
    }).afterClosed().pipe(
      map(() => this.ngOnInit()),
    ).subscribe();
  }

  redirect() {
    this.router.navigate(['all-sales']);
  }

}
