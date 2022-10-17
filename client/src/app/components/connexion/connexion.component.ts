import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.sass']
})
export class ConnexionComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value).pipe(
      map((reponse) => {
        // console.log(reponse.cookie)
        this.auth.saveUserToLocalStorage(reponse.user)
        this.router.navigate(['/all-sales']);
        this.snackBar.open('Bienvenu sur SWP!', 'Ok');
      }),
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
