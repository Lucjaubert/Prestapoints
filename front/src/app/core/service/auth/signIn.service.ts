import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/model/responseApi';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private environnementURL = environment.apiUrl;

  constructor(public http : HttpClient) { }

  createUser(user: User): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.environnementURL}/sign-in`, user);
  }

  verifyEmail(email?: string): Observable<boolean>{
    return this.http.post<boolean>(`${this.environnementURL}/public/email/verification`, email);
  }
}
