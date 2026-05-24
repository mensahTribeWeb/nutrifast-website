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
meal-planner.component.ts

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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss'],
})
export class MealPlannerComponent {
  showForm = false;

  meal = {
    name: '',
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
  };

  meals: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[] = [];

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addMeal(): void {
    if (
      this.meal.name &&
      this.meal.calories &&
      this.meal.protein !== null &&
      this.meal.carbs !== null &&
      this.meal.fat !== null
    ) {
      this.meals.push({
        name: this.meal.name,
        calories: this.meal.calories ?? 0,
        protein: this.meal.protein ?? 0,
        carbs: this.meal.carbs ?? 0,
        fat: this.meal.fat ?? 0,
      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.meal = {
      name: '',
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
    };
    this.showForm = false;
  }
}
