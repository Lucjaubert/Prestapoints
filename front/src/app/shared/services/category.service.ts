import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { Prestation } from '../model/prestation';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class CategoryService {
  private environnementURL = environment.apiUrl;
  private imageUrl = environment.imgUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    const url = `${this.environnementURL}/categories`;
    return this.http.get<Category[]>(url);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    const url = `${this.environnementURL}/categories/${categoryId}`;
    return this.http.get<Category>(url);
  }

  getPrestationsByCategory(categoryId: string): Observable<Prestation[]> {
    const url = `${this.environnementURL}/prestations/categories/${categoryId}`;
    return this.http.get<Prestation[]>(url);
  }

  getStaticCategories(): Observable<Category[]> {
    return of(this.getCategoryStatic());
  }

  getCategoryStatic(): Category[] {
    return [
      {
        name: 'Animaux',
        id: 1,
        img: `${this.imageUrl}/animaux.png`,
      },
      {
        name: 'Jardinage',
        id: 6,
        img: `${this.imageUrl}/jardinage.png`,
      },
      {
        name: 'Mode',
        id: 5,
        img: `${this.imageUrl}/mode.png`,
      },
      {
        name: 'Photographie',
        id: 8,
        img: `${this.imageUrl}/photographie.png`,
      },
      {
        name: 'Poterie',
        id: 2,
        img: `${this.imageUrl}/poterie.png`,
      },
      {
        name: 'Restauration',
        id: 3,
        img: `${this.imageUrl}/restauration.png`,
      },
      {
        name: 'Travaux',
        id: 4,
        img: `${this.imageUrl}/travaux.png`,
      },
      {
        name: 'Véhicules',
        id: 7,
        img: `${this.imageUrl}/vehicules.png`,
      },
    ];
  }
}
