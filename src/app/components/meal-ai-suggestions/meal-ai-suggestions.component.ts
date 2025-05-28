import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.model';
import { MealCardComponent } from '../meal-card/meal-card.component';

@Component({
  selector: 'app-meal-ai-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule, MealCardComponent],
  templateUrl: './meal-ai-suggestions.component.html',
  styleUrls: ['./meal-ai-suggestions.component.scss'],
})
export class MealAiSuggestionsComponent {
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
    tags: undefined,
    image_url: undefined,
  };

  suggestions: Meal[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  recommendedMeals: any;

  constructor(private mealService: MealService) {}

  /** 🔍 AI Recommendations */
  getSuggestions(): void {
    this.loading = true;
    this.error = null;
    this.suggestions = [];

    this.mealService.getRecommendedMeals(this.filters).subscribe({
      next: (meals) => {
        this.suggestions = meals;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching AI recommendations';
        this.loading = false;
        console.error(err);
      },
    });
  }

  /** ✅ Submit meal to backend */
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
      tags: undefined,
      image_url: undefined,
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
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to submit meal.';
        console.error('Submission error:', err);
      },
    });
  }
}
