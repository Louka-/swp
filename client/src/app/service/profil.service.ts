import { Body } from '@nestjs/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProfilDto } from '../models/add-profil-dto.model';
import { Profil } from '../models/profil.model';

const API_PROFIL = 'http://localhost:3000/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private http: HttpClient
  ) { }

  getUserProfil(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${API_PROFIL}/one/${id}`);
  }

  saveNewProfil(id: number, dto: AddProfilDto): Observable<Profil> {
    return this.http.put<Profil>(`${API_PROFIL}/edit/${id}`, dto);
  }
}
