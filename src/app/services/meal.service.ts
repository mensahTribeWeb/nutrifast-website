/*
============================================================================
Western Governors University
Bachelor of Science in Computer Science

C964 - Computer Science Capstone

Project Title:
NutriFast: AI-Powered Meal Planning & Fasting Assistant

Project Description:
A Data-Driven Approach to Personalized Nutrition and Fasting Optimization

Author:
Nicholas D. Mensah

Student ID:
010195113

Capstone Advisor:
Dr. Charlie Paddock

Submission Date:
May 22, 2026

File Name:
meal.service.ts

Purpose:
This file is part of the NutriFast platform, an AI-powered nutrition,
meal-planning, and fasting management application designed to provide
personalized dietary recommendations, fasting guidance, and health-focused
decision support through data-driven analysis and modern software
engineering practices.

Degree Program:
Bachelor of Science in Computer Science

Course:
C964 - Computer Science Capstone

Copyright (c) 2026 Nicholas D. Mensah
============================================================================
*/

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
