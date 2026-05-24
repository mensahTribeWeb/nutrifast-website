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
meal-recommendation.service.ts

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

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
import { MealCardComponent } from '../components/meal-card/meal-card.component';

@Component({
  selector: 'app-meal-ai-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule, MealCardComponent],
  templateUrl: '../components/meal-card/meal-card.component.html',
  styleUrls: ['../components/meal-card/meal-card.component.scss'],
})
export class MealAiSuggestionsComponent implements OnInit {
  filters: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  } = {};

  meal: Meal = {
    name: '',
    description: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    portion_g: 0,
    tags: [],
    image_url: '',
  };

  recommendedMeals: Meal[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(@Inject(MealService) private mealService: MealService) {}

  ngOnInit(): void {
    this.getSuggestions();
  }

  /** 🔍 Fetch AI Recommendations */
  getSuggestions(): void {
    this.loading = true;
    this.error = null;
    this.recommendedMeals = [];

    this.mealService.getRecommendedMeals(this.filters).subscribe({
      next: (meals: Meal[]) => {
        this.recommendedMeals = meals;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error fetching AI recommendations';
        this.loading = false;
        console.error(err);
      },
    });
  }

  /** ✅ Submit a new meal to the backend */
  submitMeal(): void {
    this.successMessage = null;
    this.errorMessage = null;

    const mealToSend: Meal = {
      name: this.meal.name,
      calories: this.meal.calories,
      protein: this.meal.protein,
      carbs: this.meal.carbs,
      fat: this.meal.fat,
      description: this.meal.description || '',
      portion_g: this.meal.portion_g || 0,
      fiber: this.meal.fiber || 0,
      tags: [],
      image_url: '',
    };

    this.mealService.addMeal(mealToSend).subscribe({
      next: () => {
        this.successMessage = '✅ Meal successfully logged!';
        this.meal = {
          name: '',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          description: '',
          fiber: 0,
          portion_g: 0,
          tags: [],
          image_url: '',
        };
        this.getSuggestions(); // Optional: Refresh recommendations
      },
      error: (err: any) => {
        this.errorMessage = '❌ Failed to submit meal.';
        console.error('Submission error:', err);
      },
    });
  }
}
