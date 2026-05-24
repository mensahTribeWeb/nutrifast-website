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
import { SavedMeal } from '../../models/meal.model';
import { ProgressEntry, UserService } from '../../services/user.service';

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
  date: string;
  day: string;
  calories: number;
  hasEntry: boolean;
};

@Component({
  selector: 'app-analytics-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-summary.component.html',
  styleUrls: ['./analytics-summary.component.scss'],
})
export class AnalyticsSummaryComponent implements OnInit {
  progressEntries: ProgressEntry[] = [];
  savedMeals: SavedMeal[] = [];
  macroItems: MacroItem[] = [];
  calorieDays: CalorieDay[] = [];
  currentWeight = 159.4;
  startWeight = 162.4;
  goalWeight = 150;
  fastingTargetHours = 16;
  progressPercentage = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const profile = this.userService.getUserProfile();
    const weightGoals = this.userService.getWeightGoals();
    this.startWeight = weightGoals.startWeight;
    this.currentWeight = weightGoals.currentWeight;
    this.goalWeight = weightGoals.goalWeight;
    this.fastingTargetHours = this.parseFastingTarget(profile?.fastingType);
    this.progressEntries = this.userService.getProgressEntries();
    this.savedMeals = this.userService.getSavedMeals();
    this.calorieDays = this.buildCalorieDays();
    this.macroItems = this.buildMacroItems();
    this.calculateProgress();
  }

  get weightLost(): number {
    return Math.max(0, Math.round(Math.abs(this.startWeight - this.currentWeight) * 10) / 10);
  }

  get weightRemaining(): number {
    return Math.max(0, Math.round(Math.abs(this.currentWeight - this.goalWeight) * 10) / 10);
  }

  get currentWeekEntries(): ProgressEntry[] {
    const currentWeekDates = new Set(this.getLastSevenDateKeys());
    return this.progressEntries.filter((entry) => currentWeekDates.has(entry.date));
  }

  get caloriesConsumed(): number {
    return this.todayEntry?.calories ?? 0;
  }

  get averageCalories(): number {
    if (this.currentWeekEntries.length === 0) {
      return 0;
    }

    return Math.round(
      this.currentWeekEntries.reduce((sum, entry) => sum + entry.calories, 0) /
        this.currentWeekEntries.length
    );
  }

  get averageFasting(): string {
    if (this.currentWeekEntries.length === 0) {
      return '0.0';
    }

    return (
      this.currentWeekEntries.reduce((sum, entry) => sum + entry.fastingHours, 0) /
      this.currentWeekEntries.length
    ).toFixed(1);
  }

  get fastingConsistency(): number {
    if (this.currentWeekEntries.length === 0) {
      return 0;
    }

    const consistencyScores = this.currentWeekEntries.map((entry) =>
      Math.min(100, Math.round((entry.fastingHours / this.fastingTargetHours) * 100))
    );

    return Math.round(
      consistencyScores.reduce((sum, score) => sum + score, 0) / consistencyScores.length
    );
  }

  get todayEntry(): ProgressEntry | undefined {
    return this.progressEntries.find((entry) => entry.date === this.todayDateKey);
  }

  get calorieMax(): number {
    return Math.max(...this.calorieDays.map((day) => day.calories), 1);
  }

  get macroCaloriesTotal(): number {
    return this.macroItems.reduce((sum, macro) => sum + macro.calories, 0);
  }

  get metricCards(): MetricCard[] {
    return [
      {
        label: 'Avg Calories',
        value: this.averageCalories > 0 ? `${this.averageCalories} kcal` : 'No entries',
        detail: `${this.currentWeekEntries.length} progress days logged this week`,
        tone: 'gold',
      },
      {
        label: 'Current Weight',
        value: `${this.currentWeight.toFixed(1)} lbs`,
        detail: `${this.weightLost.toFixed(1)} lbs changed from start`,
        tone: 'blue',
      },
      {
        label: 'Goal Progress',
        value: `${this.progressPercentage}%`,
        detail: `${this.weightRemaining.toFixed(1)} lbs to goal`,
        tone: 'gold',
      },
      {
        label: 'Avg Fasting',
        value: this.currentWeekEntries.length > 0 ? `${this.averageFasting} hrs` : 'No entries',
        detail: `${this.fastingConsistency}% of ${this.fastingTargetHours} hour target`,
        tone: 'green',
      },
      {
        label: 'Logged Meals',
        value: `${this.savedMeals.length}`,
        detail: 'Meal logs used for macro breakdown',
        tone: 'blue',
      },
    ];
  }

  get insightItems(): string[] {
    const insights: string[] = [];

    if (this.currentWeekEntries.length === 0) {
      insights.push('Add daily progress entries to generate calorie and fasting insights.');
    } else {
      insights.push(
        `This week includes ${this.currentWeekEntries.length} saved progress entries.`
      );
      insights.push(
        `Average fasting is ${this.averageFasting} hours against a ${this.fastingTargetHours} hour target.`
      );
    }

    if (this.savedMeals.length === 0) {
      insights.push('Log meals to populate the macro breakdown from actual food entries.');
    } else {
      insights.push(`${this.savedMeals.length} saved meals are contributing macro data.`);
    }

    insights.push(`${this.weightRemaining.toFixed(1)} lbs remain between current and goal weight.`);
    return insights;
  }

  calculateProgress(): void {
    const totalWeightChange = Math.abs(this.startWeight - this.goalWeight);
    if (totalWeightChange > 0) {
      const percentComplete = (this.weightLost / totalWeightChange) * 100;
      this.progressPercentage = Math.min(100, Math.max(0, Math.round(percentComplete)));
      return;
    }

    this.progressPercentage = 100;
  }

  macroShare(macro: MacroItem): number {
    if (this.macroCaloriesTotal <= 0) {
      return 0;
    }

    return Math.round((macro.calories / this.macroCaloriesTotal) * 100);
  }

  calorieHeight(calories: number): number {
    return Math.round((calories / this.calorieMax) * 100);
  }

  private get todayDateKey(): string {
    return this.toDateKey(new Date());
  }

  private buildCalorieDays(): CalorieDay[] {
    const entriesByDate = new Map(this.progressEntries.map((entry) => [entry.date, entry]));

    return this.getLastSevenDateKeys().map((date) => {
      const entry = entriesByDate.get(date);

      return {
        date,
        day: this.formatDayLabel(date),
        calories: entry?.calories ?? 0,
        hasEntry: Boolean(entry),
      };
    });
  }

  private buildMacroItems(): MacroItem[] {
    const proteinGrams = this.sumMealMacro('protein');
    const carbGrams = this.sumMealMacro('carbs');
    const fatGrams = this.sumMealMacro('fat');

    const macroItems: MacroItem[] = [
      { label: 'Protein', grams: proteinGrams, calories: proteinGrams * 4, tone: 'protein' },
      { label: 'Carbs', grams: carbGrams, calories: carbGrams * 4, tone: 'carbs' },
      { label: 'Fat', grams: fatGrams, calories: fatGrams * 9, tone: 'fat' },
    ];

    return macroItems.filter((macro) => macro.grams > 0);
  }

  private sumMealMacro(key: 'protein' | 'carbs' | 'fat'): number {
    const total = this.savedMeals.reduce((sum, meal) => sum + Number(meal[key] ?? 0), 0);
    return Math.round(total * 10) / 10;
  }

  private getLastSevenDateKeys(): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      dates.push(this.toDateKey(date));
    }

    return dates;
  }

  private toDateKey(date: Date): string {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  }

  private formatDayLabel(dateKey: string): string {
    return new Date(`${dateKey}T00:00:00`).toLocaleDateString([], { weekday: 'short' });
  }

  private parseFastingTarget(fastingType?: string): number {
    const targetHours = Number(String(fastingType ?? '').split(':')[0]);
    return targetHours > 0 ? targetHours : 16;
  }
}
