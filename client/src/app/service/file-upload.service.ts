import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_UPLOAD = 'http://localhost:3000/upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<File>(`${API_UPLOAD}/image`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getFiles(name: string): Observable<any> {
    return this.http.get(`${API_UPLOAD}/image/${name}`);
  }
}
