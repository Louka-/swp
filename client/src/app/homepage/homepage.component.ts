import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent {

  constructor(
    private router: Router
  ) { }

  goToConnexion() {
    this.router.navigate(['/connexion']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
