import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.sass']
})
export class ConnexionComponent {
  message = '';
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(loginForm: NgForm) {
    this.authService.login(loginForm.value).pipe(
      map((reponse) => {
        localStorage.setItem('token', reponse.access_token);
        this.message = 'succes';
        this.router.navigate(['/all-sales']);
        // if (erreur) {
        //   this.message = 'Veuillez vérifier vos credantials';
        // }
      }),
    ).subscribe();
  }

}
