import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { ResponseApi } from '../model/responseApi';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  environmentUrl = environment.apiUrl;
  apiUrl: string = '';
  user2: User = new User();

  constructor(public http: HttpClient) {}

  updateUser(user: User): Observable<ResponseApi> {
    this.apiUrl = `${this.environmentUrl}/update`;

    return this.http.post<ResponseApi>(this.apiUrl, user);
  }

  getUserConnected(): Observable<User> {
    this.apiUrl = `${this.environmentUrl}/getUserConnected`;

    return this.http.get<User>(this.apiUrl);
  }

  updateAvatar(imageFormData: FormData): Observable<ResponseApi> {
    this.apiUrl = `${this.environmentUrl}/avatar`;

    return this.http.post<ResponseApi>(this.apiUrl, imageFormData);
  }

  getAvatar(): Observable<ArrayBuffer> {
    this.apiUrl = `${this.environmentUrl}/get/avatar`;

    return this.http.get(this.apiUrl, { responseType: 'arraybuffer' });
  }
}
