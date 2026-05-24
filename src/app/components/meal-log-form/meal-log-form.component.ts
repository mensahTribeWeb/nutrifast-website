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
meal-log-form.component.ts

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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meal, SavedMeal } from '../../models/meal.model';
import { MealService } from '../../services/meal.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-log-form.component.html',
  styleUrls: ['./meal-log-form.component.scss'],
})
export class MealLogFormComponent implements OnInit {
  meal: Meal = this.createEmptyMeal();
  searchResults: Meal[] = [];
  savedMeals: SavedMeal[] = [];
  lookupMessage: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private mealService: MealService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.savedMeals = this.userService.getSavedMeals();
  }

  /** Search the prepared USDA feature dataset as the user types a food name. */
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

  /** Copy a selected USDA result into the editable meal form fields. */
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

  /** Submit the meal to the API and save a user-scoped local log entry. */
  submitMeal(): void {
    this.successMessage = null;
    this.errorMessage = null;

    this.mealService.addMeal(this.meal).subscribe({
      next: (loggedMeal) => {
        const savedMeal = this.userService.saveMealLog(loggedMeal);
        this.savedMeals = [savedMeal, ...this.savedMeals].slice(0, 25);
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

  /** Remove a saved meal from the active user's local prototype history. */
  deleteSavedMeal(logId: string): void {
    this.userService.deleteMealLog(logId);
    this.savedMeals = this.savedMeals.filter((meal) => meal.logId !== logId);
  }

  /** Format an ISO timestamp for compact display in the meal history list. */
  loggedAtLabel(loggedAt: string): string {
    return new Date(loggedAt).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
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
