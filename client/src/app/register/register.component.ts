import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register(registerForm: NgForm) {
    this.auth.register(registerForm.value).pipe(
      map((reponse) => {
        localStorage.setItem('jwt', reponse.jwt);
        localStorage.setItem('userId', reponse.id);
        this.router.navigate(['/all-sales']);
      }),
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
