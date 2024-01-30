import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class AuthenticationService {

  private environnementURL = environment.apiUrl;

  private authUrl = `${this.environnementURL}/auth`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    const storedLoggedInState = localStorage.getItem('isLoggedIn');
    const initialLoggedInState = storedLoggedInState ? JSON.parse(storedLoggedInState) : false;
    this.isLoggedInSubject.next(initialLoggedInState);
  }

  login(username: string, password: string): Observable<boolean> {

    return this.http.post<{ token: string }>(this.authUrl, '', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password),
      }
    })
      .pipe(map(
        response => {
          // login successful if there's a jwt token in the response
          let token = response.token;
          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedInSubject.next(true);
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        }));
  }

  getToken(): string {
    // @ts-ignore
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    
    return token ? token : "";
  }

  getRoles(): string[] {
    interface JWT {
      role: string[];
      exp: number;
      iat: number;
      sub: string;
    }
    const token = this.getToken();
    
    return (token && jwtDecode<JWT>(token)?.role) || [];
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  
}
