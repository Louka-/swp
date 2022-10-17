import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { map, switchMap } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../models/sale.model';
import { UserSalesComponent } from '../user-sales/user-sales.component';
import { FileUploadService } from '../../service/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-sale',
  templateUrl: './post-sale.component.html',
  styleUrls: ['./post-sale.component.sass']
})
export class PostSaleComponent implements OnInit {
  saleForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    pictureOne: new FormControl(),
    pictureTwo: new FormControl(),
    pictureThree: new FormControl(),
    price: new FormControl(0, [Validators.required]),
    shipping: new FormControl(),
  });

  sale?: Sale;
  errors: boolean = false;

  types = [
    { type: "armure" },
    { type: "arme" },
    { type: "accessoire" },
    { type: "autre" },
  ];

  photos: File[] = [];

  constructor(
    private saleService: SalesService,
    private userService: UserService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private uploadService: FileUploadService,
    private dialogRef: MatDialogRef<UserSalesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.sale = data.sale;
  }

  get f() { return this.saleForm.controls; }

  ngOnInit(): void {
    if (!!this.sale) {
      this.saleForm?.setValue({
        title: this.sale.title,
        type: this.sale.type,
        message: this.sale.message,
        pictureOne: this.sale.pictureOne,
        pictureTwo: this.sale.pictureTwo,
        pictureThree: this.sale.pictureThree,
        price: this.sale.price,
        shipping: this.sale.shipping,
      });
    }
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.photos.push(event.target.files[i]);
    }
  }

  validate(form: FormGroup) {
    if (this.saleForm.invalid) {
      this.errors = true;
      return;
    }
    this.uploadService.uploadSalePhoto(this.photos).pipe(
      map(res => {
        form.get('pictureOne')?.patchValue(res[0]?.filename);
        form.get('pictureTwo')?.patchValue(res[1]?.filename);
        form.get('pictureThree')?.patchValue(res[2]?.filename);
      }),
    ).pipe(
      map(() => this.userService.getUserById(this.auth.loadUserFromLocalStorage().id).pipe(
        switchMap(user => {
          const shipping = form.get('shipping')
          if (!shipping?.value) {
            shipping?.patchValue(false);
          }
          return this.saleService.postSale(form.value, user.profil.id);
        })
      ).subscribe()),
    ).pipe(
      map(() => {
        this.router.navigate(['all-sales']);
        this.snackBar.open('Votre annonce est en ligne.', 'Ok');
      })
    ).subscribe()
  }

  updateSale(id: number, form: FormGroup) {
    if (this.saleForm.invalid) {
      this.errors = true;
      return;
    }
    this.uploadService.uploadSalePhoto(this.photos).pipe(
      map(res => {
        form.get('pictureOne')?.patchValue(res[0]?.filename);
        form.get('pictureTwo')?.patchValue(res[1]?.filename);
        form.get('pictureThree')?.patchValue(res[2]?.filename);
      }),
    ).pipe(
      map(() => this.saleService.editSale(id, form.value).subscribe())
    ).subscribe()
    this.dialogRef.close();
  }

  redirect() {
    this.router.navigate(['all-sales']);
  }

}
