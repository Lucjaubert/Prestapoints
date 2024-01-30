import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Prestation } from '../model/prestation';
import { ResponseApi } from '../model/responseApi';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class PrestationService {
  private apiUrl?: string;
  environmentUrl = environment.apiUrl;
  private searchInProgress: boolean = false;

  constructor(private http: HttpClient) {}

  setSearchInProgress(status: boolean): void {
    this.searchInProgress = status;
  }

  isSearchInProgress(): boolean {
    return this.searchInProgress;
  }


  getPrestations(): Observable<Prestation[]> {
    this.apiUrl = `${this.environmentUrl}/accueil`;

    return this.http.get<Prestation[]>(this.apiUrl);
  }

  getPrestationById(id: string): Observable<Prestation> {
    this.apiUrl = `${this.environmentUrl}/prestations/${id}`;

    return this.http.get<Prestation>(this.apiUrl);
  }

  addRegistration(id: number | undefined): Observable<ResponseApi> {
    this.apiUrl = `${this.environmentUrl}/prestations/prestation/registration`;

    return this.http.post<ResponseApi>(this.apiUrl, id);
  }

  undoRegistration(id: number | undefined): Observable<ResponseApi> {
    this.apiUrl = `${this.environmentUrl}/prestations/prestation/registration/suppression/${id}`;

    return this.http.delete<ResponseApi>(this.apiUrl);
  }

  createPrestation(prestation: Prestation): Observable<Prestation> {
    this.apiUrl = `${this.environmentUrl}/prestations`;

    return this.http.post<Prestation>(this.apiUrl, prestation);
  }
}
