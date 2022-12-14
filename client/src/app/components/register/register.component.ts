import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  register(registerForm: NgForm) {
    this.auth.register(registerForm.value).pipe(
      map((reponse) => {
        if (reponse.successStatus === false) {
          this.snackBar.open(reponse.message, 'Ok')
          return;
        }
        this.auth.saveUserToLocalStorage(reponse.user);
        this.router.navigate(['/all-sales']);
        this.snackBar.open('Bienvenu sur SWP! Pensez à compléter votre profil.', 'Ok');
      }),
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
