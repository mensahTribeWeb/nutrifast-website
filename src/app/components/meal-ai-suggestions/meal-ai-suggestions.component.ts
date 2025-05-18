import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-ai-suggestions',
  templateUrl: './meal-ai-suggestions.component.html',
  styleUrls: ['./meal-ai-suggestions.component.scss'],
  imports: [BrowserModule, FormsModule],
  standalone: true,
})
export class MealAiSuggestionsComponent {
  filters = {
    calories: undefined,
    protein: undefined,
    fat: undefined,
    carbs: undefined,
  };

  suggestions: Meal[] = [];
  loading = false;
  error: string | null = null;

  constructor(private mealService: MealService) {}

  getSuggestions(): void {
    this.loading = true;
    this.error = null;

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
}
