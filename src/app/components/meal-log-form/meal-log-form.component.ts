import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meal } from '../../models/meal.model';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-log-form.component.html',
  styleUrls: ['./meal-log-form.component.scss'],
})
export class MealLogFormComponent {
  meal: Meal = this.createEmptyMeal();
  searchResults: Meal[] = [];
  lookupMessage: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private mealService: MealService) {}

  searchFoods(): void {
    this.lookupMessage = null;
    this.searchResults = [];

    if (this.meal.name.trim().length < 2) {
      return;
    }

    this.mealService.searchFoods(this.meal.name).subscribe({
      next: (foods) => {
        this.searchResults = foods;
        if (foods.length === 0) {
          this.lookupMessage = 'No matching foods found in the USDA dataset.';
        }
      },
      error: (err) => {
        this.lookupMessage = 'Unable to search the nutrition dataset.';
        console.error('Food search error:', err);
      },
    });
  }

  selectFood(food: Meal): void {
    this.meal = {
      ...food,
      calories: Math.round(food.calories || 0),
      protein: this.roundMacro(food.protein),
      carbs: this.roundMacro(food.carbs),
      fat: this.roundMacro(food.fat),
      fiber: this.roundMacro(food.fiber),
      portion_g: this.roundMacro(food.portion_g),
    };
    this.searchResults = [];
    this.lookupMessage = 'Nutrition fields filled from the USDA dataset.';
  }

  submitMeal(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.mealService.addMeal(this.meal).subscribe({
      next: () => {
        this.successMessage = 'Meal successfully logged.';
        this.meal = this.createEmptyMeal();
        this.searchResults = [];
        this.lookupMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit meal.';
        console.error('Submission error:', err);
      },
    });
  }

  private createEmptyMeal(): Meal {
    return {
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
  }

  private roundMacro(value?: number): number {
    return Math.round((value || 0) * 10) / 10;
  }
}
