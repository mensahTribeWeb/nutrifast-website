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
analytics-summary.component.ts

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
import { UserService } from '../../services/user.service';

type MetricCard = {
  label: string;
  value: string;
  detail: string;
  tone: 'gold' | 'green' | 'blue' | 'red';
};

type MacroItem = {
  label: string;
  grams: number;
  calories: number;
  tone: 'protein' | 'carbs' | 'fat';
};

type CalorieDay = {
  day: string;
  calories: number;
};

@Component({
  selector: 'app-analytics-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-summary.component.html',
  styleUrls: ['./analytics-summary.component.scss'],
})
export class AnalyticsSummaryComponent implements OnInit {
  readonly startWeight = 162.4;
  readonly goalWeight = 150;
  readonly caloriesConsumed = 2300;
  readonly caloriesBurned = 2500;
  readonly fastingConsistency = 86;
  readonly macroItems: MacroItem[] = [
    { label: 'Protein', grams: 112, calories: 448, tone: 'protein' },
    { label: 'Carbs', grams: 145, calories: 580, tone: 'carbs' },
    { label: 'Fat', grams: 42, calories: 378, tone: 'fat' },
  ];
  readonly calorieDays: CalorieDay[] = [
    { day: 'Mon', calories: 1420 },
    { day: 'Tue', calories: 1360 },
    { day: 'Wed', calories: 1280 },
    { day: 'Thu', calories: 1325 },
    { day: 'Fri', calories: 1210 },
    { day: 'Sat', calories: 1490 },
    { day: 'Sun', calories: 1235 },
  ];

  currentWeight = 159.4;
  progressPercentage = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentWeight = this.userService.getCurrentWeight(this.currentWeight);
    this.calculateProgress();
  }

  get weightLost(): number {
    return Math.round((this.startWeight - this.currentWeight) * 10) / 10;
  }

  get weightRemaining(): number {
    return Math.max(0, Math.round((this.currentWeight - this.goalWeight) * 10) / 10);
  }

  get calorieBalance(): number {
    return this.caloriesConsumed - this.caloriesBurned;
  }

  get calorieMax(): number {
    return Math.max(...this.calorieDays.map((day) => day.calories));
  }

  get macroCaloriesTotal(): number {
    return this.macroItems.reduce((sum, macro) => sum + macro.calories, 0);
  }

  get metricCards(): MetricCard[] {
    return [
      {
        label: 'Energy Balance',
        value: `${this.calorieBalance} kcal`,
        detail: this.calorieBalance <= 0 ? 'Estimated deficit today' : 'Estimated surplus today',
        tone: this.calorieBalance <= 0 ? 'green' : 'red',
      },
      {
        label: 'Current Weight',
        value: `${this.currentWeight.toFixed(1)} lbs`,
        detail: `${this.weightLost.toFixed(1)} lbs down from start`,
        tone: 'blue',
      },
      {
        label: 'Goal Progress',
        value: `${this.progressPercentage}%`,
        detail: `${this.weightRemaining.toFixed(1)} lbs to goal`,
        tone: 'gold',
      },
      {
        label: 'Fasting Consistency',
        value: `${this.fastingConsistency}%`,
        detail: 'Weekly schedule adherence',
        tone: 'green',
      },
    ];
  }

  get insightItems(): string[] {
    return [
      'Your calorie balance supports gradual weight loss today.',
      'Protein intake is strong enough to support satiety and lean mass.',
      'The next useful adjustment is keeping weekend calories closer to weekday intake.',
    ];
  }

  calculateProgress(): void {
    const totalWeightToLose = this.startWeight - this.goalWeight;
    if (totalWeightToLose > 0) {
      const percentComplete = (this.weightLost / totalWeightToLose) * 100;
      this.progressPercentage = Math.min(100, Math.max(0, Math.round(percentComplete)));
    }
  }

  macroShare(macro: MacroItem): number {
    return Math.round((macro.calories / this.macroCaloriesTotal) * 100);
  }

  calorieHeight(calories: number): number {
    return Math.round((calories / this.calorieMax) * 100);
  }
}
