import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Profil } from '../models/profil.model';
import { ProfilService } from '../service/profil.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.sass'],
})
export class EditProfilComponent implements OnInit {
  userId = this.auth.getCurrentUserId();
  profil$: Observable<Profil> = this.userService.getUserById(this.userId).pipe(
    map(user => user.profil),
    tap(profil => this.profilId = profil.id)
  );
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  profilId: number = 0;

  profilForm = new FormGroup({
    picture: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    phone: new FormControl(),
    race: new FormControl(),
    city: new FormControl(),
    birthday: new FormControl(),
  });

  races = [
    { value: "Humain" },
    { value: "Ork" },
    { value: "Elfe" },
    { value: "Nain" },
  ]
  constructor(
    private profilService: ProfilService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    private uploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.profil$.pipe(
      map(profil => {
        this.profilForm.setValue({
          picture: profil.picture,
          name: profil.name,
          description: profil.description,
          phone: profil.phone,
          race: profil.race,
          city: profil.city,
          birthday: profil.birthday,
        })
      })
    ).subscribe()
  }

  onFileChange(event: any, form: FormGroup) {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
    form.get('picture')?.markAsDirty;
  }

  validate(form: FormGroup) {
    if (!this.currentFile) {
      this.profilService.saveNewProfil(this.profilId, form.value).pipe(
        map(() => this.router.navigate(['all-sales']))).subscribe()
    } else {
      this.uploadService.upload(this.currentFile).pipe(
        map(res => {
          form.get('picture')?.patchValue(res.filename);
        }),
      ).pipe(
        map(() => this.profilService.saveNewProfil(this.profilId, form.value).subscribe())
      ).pipe(
        map(() => this.router.navigate(['all-sales']))
      ).subscribe();
    }
  }

}
