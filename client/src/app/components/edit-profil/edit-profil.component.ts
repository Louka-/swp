import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Profil } from '../../models/profil.model';
import { ProfilService } from '../../service/profil.service';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../../service/file-upload.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.sass'],
})
export class EditProfilComponent implements OnInit {
  user = this.auth.loadUserFromLocalStorage();
  profil$: Observable<Profil> = this.userService.getUserById(this.user.id).pipe(
    map(user => user.profil),
    tap(profil => this.profilId = profil.id)
  );
  selectedFiles?: FileList;
  currentFile?: File;
  preview: string = '';
  profilId: number = 0;
  errors: boolean = false;

  profilForm = new FormGroup({
    picture: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    phone: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    birthday: new FormControl(new Date(), [Validators.required]),
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

  get f() { return this.profilForm.controls; }

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
    if (form.invalid) {
      this.errors = true;
      return;
    }
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

  redirect() {
    this.router.navigate(['all-sales']);
  }

}
