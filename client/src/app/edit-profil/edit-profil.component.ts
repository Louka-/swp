import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Profil } from '../models/profil.model';
import { ProfilService } from '../service/profil.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.sass']
})
export class EditProfilComponent implements OnInit {
  profil$: Observable<Profil> | undefined;

  races = [
    { value: "Humain" },
    { value: "Ork" },
    { value: "Elfe" },
    { value: "Nain" },
  ]
  constructor(
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
    this.profil$ = this.profilService.getUserProfil(15);
  }

  validate(form: NgForm) {
    return this.profilService.getUserProfil(15).pipe(
      switchMap(profil => this.profilService.saveNewProfil(profil.id, form.value)),
    ).subscribe();
  }

}
