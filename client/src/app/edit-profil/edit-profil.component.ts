import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Profil } from '../models/profil.model';
import { ProfilService } from '../service/profil.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.sass']
})
export class EditProfilComponent {
  userId = this.auth.getCurrentUserId();
  profil$: Observable<Profil> = this.userService.getUserById(this.userId).pipe(
    map(user => user.profil)
  );

  races = [
    { value: "Humain" },
    { value: "Ork" },
    { value: "Elfe" },
    { value: "Nain" },
  ]
  constructor(
    private profilService: ProfilService,
    private userService: UserService,
    private auth: AuthService,
  ) { }

  validate(form: NgForm) {
    return this.profil$.pipe(
      switchMap(profil => this.profilService.saveNewProfil(profil.id, form.value)),
    ).subscribe();
  }

}
