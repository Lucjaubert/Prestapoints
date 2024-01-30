import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../model/image';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ImageService {

    private environnementURL = environment.apiUrl;

    private baseUrl = '/images'; 
  
    constructor(private http: HttpClient) { }
  
    // Méthode pour récupérer une image par son ID depuis l'API
    getImageById(imageId: number): Observable<Blob> {
        const url = this.environnementURL + this.baseUrl +  '/' + imageId.toString();
        return this.http.get(url, { responseType: 'blob' });
    }

    // Méthode pour enregistrer une image
    uploadImage(image: File): Observable<number> {
        const url = this.environnementURL + this.baseUrl;
        const formData = new FormData();
        formData.append('image', image);

      return this.http.post<number>(url, formData);
    }

  }