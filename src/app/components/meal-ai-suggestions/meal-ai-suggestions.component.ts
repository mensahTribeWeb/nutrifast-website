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
meal-ai-suggestions.component.ts

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
