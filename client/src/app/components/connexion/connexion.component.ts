import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private router: Router
  ) { }

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value).pipe(
      map((reponse) => {
        localStorage.setItem('jwt', reponse.cookie?.secretData.token);
        this.auth.saveUserToLocalStorage(reponse.user)
        this.router.navigate(['/all-sales']);
      }),
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
