import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../models/meal.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/foods`;

  constructor(private http: HttpClient) {}

  /** Fetch all meals */
  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl);
  }

  getRecommendedMeals(filters: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  }): Observable<Meal[]> {
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined)
    );

    return this.http.get<Meal[]>(
      `${environment.apiBaseUrl}/api/v1/ai/recommend`,
      {
        params,
      }
    );
  }

  searchFoods(query: string): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/search`, {
      params: { q: query },
    });
  }

  /** Add a new meal */
  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.baseUrl, meal);
  }

  /** Delete a meal by ID */
  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** Update a meal by ID */
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.baseUrl}/${id}`, meal);
  }
}
