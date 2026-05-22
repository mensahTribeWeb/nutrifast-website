import { Component, OnInit } from '@angular/core';
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
export class MealAiSuggestionsComponent implements OnInit {
  filters: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  } = {};

  suggestions: Meal[] = [];
  loading = false;
  error: string | null = null;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.filters = {
      calories: 700,
      protein: 15,
    };
    this.getSuggestions();
  }

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
}
