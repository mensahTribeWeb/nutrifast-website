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
progress-charts.component.ts

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
import { ProgressEntry, UserService } from '../../services/user.service';

type ProgressDay = {
  date: string;
  day: string;
  calories: number;
  fastingHours: number;
  weight: number;
  adherence: number;
  hasSavedEntry: boolean;
};

type SummaryMetric = {
  label: string;
  value: string;
  detail: string;
  tone: 'green' | 'gold' | 'blue';
};

@Component({
  selector: 'app-progress-charts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-charts.component.html',
  styleUrl: './progress-charts.component.scss',
})
export class ProgressChartsComponent implements OnInit {
  progressDays: ProgressDay[] = [];
  progressDraft: ProgressEntry = {
    date: '',
    weight: 159.4,
    calories: 1235,
    fastingHours: 16,
  };
  saveMessage: string | null = null;

  readonly fastingMax = 18;
  readonly fastingTarget = 16;
  readonly calorieTarget = 1350;
  currentWeight = 159.4;
  startWeight = 162.4;
  goalWeight = 150;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const weightGoals = this.userService.getWeightGoals();
    this.startWeight = weightGoals.startWeight;
    this.currentWeight = weightGoals.currentWeight;
    this.goalWeight = weightGoals.goalWeight;
    this.progressDays = this.buildProgressDays();
    this.setDraftFromDay(this.progressDays[this.progressDays.length - 1]);
  }

  get calorieMax(): number {
    return Math.max(...this.progressDays.map((day) => day.calories), this.calorieTarget, 1);
  }

  get fastingScaleMax(): number {
    return Math.max(...this.progressDays.map((day) => day.fastingHours), this.fastingMax);
  }

  get averageCalories(): number {
    const savedDays = this.progressDays.filter((day) => day.hasSavedEntry);
    if (savedDays.length === 0) {
      return 0;
    }

    return Math.round(
      savedDays.reduce((sum, day) => sum + day.calories, 0) / savedDays.length
    );
  }

  get averageFasting(): string {
    const savedDays = this.progressDays.filter((day) => day.hasSavedEntry);
    if (savedDays.length === 0) {
      return '0.0';
    }

    return (
      savedDays.reduce((sum, day) => sum + day.fastingHours, 0) /
      savedDays.length
    ).toFixed(1);
  }

  get averageAdherence(): number {
    const savedDays = this.progressDays.filter((day) => day.hasSavedEntry);
    if (savedDays.length === 0) {
      return 0;
    }

    return Math.round(
      savedDays.reduce((sum, day) => sum + day.adherence, 0) / savedDays.length
    );
  }

  get weightDelta(): string {
    const savedDays = this.progressDays.filter((day) => day.hasSavedEntry);
    const firstDay = savedDays[0];
    const lastDay = savedDays[savedDays.length - 1];
    if (!firstDay || !lastDay || savedDays.length < 2) {
      return '0.0';
    }

    return (lastDay.weight - firstDay.weight).toFixed(1);
  }

  get savedEntryCount(): number {
    return this.progressDays.filter((day) => day.hasSavedEntry).length;
  }

  get weightTrendLabel(): string {
    if (this.savedEntryCount === 0) {
      return 'No entries';
    }

    if (this.savedEntryCount === 1) {
      return 'Need 2 entries';
    }

    return `${this.weightDelta} lbs`;
  }

  get weeklySavedEntries(): ProgressDay[] {
    return this.progressDays.filter((day) => day.hasSavedEntry).slice().reverse();
  }

  get bestFastingDay(): ProgressDay | null {
    const savedDays = this.progressDays.filter((day) => day.hasSavedEntry);
    if (savedDays.length === 0) {
      return null;
    }

    return savedDays.reduce((bestDay, currentDay) =>
      currentDay.fastingHours > bestDay.fastingHours ? currentDay : bestDay
    );
  }

  get weightDeltaAbs(): string {
    return Math.abs(Number(this.weightDelta)).toFixed(1);
  }

  get weightLost(): number {
    return Math.max(0, Math.round(Math.abs(this.startWeight - this.currentWeight) * 10) / 10);
  }

  get weightRemaining(): number {
    return Math.max(0, Math.round(Math.abs(this.currentWeight - this.goalWeight) * 10) / 10);
  }

  get goalProgressPercentage(): number {
    const totalChange = Math.abs(this.startWeight - this.goalWeight);
    if (totalChange <= 0) {
      return 100;
    }

    return Math.min(100, Math.max(0, Math.round((this.weightLost / totalChange) * 100)));
  }

  get estimatedGoalDate(): string {
    if (this.weightRemaining <= 0) {
      return 'Goal reached';
    }

    if (this.savedEntryCount < 2) {
      return 'Needs more weigh-ins';
    }

    const weeklyLoss = Number(this.weightDeltaAbs);
    if (weeklyLoss <= 0) {
      return 'Needs more weigh-ins';
    }

    const weeksRemaining = Math.ceil(this.weightRemaining / weeklyLoss);
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + weeksRemaining * 7);

    return estimatedDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  get summaryMetrics(): SummaryMetric[] {
    return [
      {
        label: 'Avg Calories',
        value: `${this.averageCalories} kcal`,
        detail: '7 day intake average',
        tone: 'gold',
      },
      {
        label: 'Avg Fasting',
        value: `${this.averageFasting} hrs`,
        detail: 'Fasting window consistency',
        tone: 'green',
      },
      {
        label: 'Goal Progress',
        value: `${this.goalProgressPercentage}%`,
        detail: `${this.weightRemaining.toFixed(1)} lbs remaining`,
        tone: 'blue',
      },
      {
        label: 'Plan Adherence',
        value: `${this.averageAdherence}%`,
        detail: 'Meals and fasting aligned',
        tone: 'green',
      },
    ];
  }

  get weeklyWeightInsight(): string {
    if (this.savedEntryCount === 0) {
      return 'Save daily progress entries to calculate a real weight trend.';
    }

    if (this.savedEntryCount === 1) {
      return 'Add one more weigh-in to calculate a real weight trend.';
    }

    const weeklyChange = Number(this.weightDelta);

    if (weeklyChange < 0) {
      return `Weight is trending down by ${this.weightDeltaAbs} lbs this week.`;
    }

    if (weeklyChange > 0) {
      return `Weight is trending up by ${this.weightDeltaAbs} lbs this week.`;
    }

    return 'Weight held steady this week.';
  }

  calorieHeight(calories: number): number {
    return Math.round((calories / this.calorieMax) * 100);
  }

  fastingHeight(hours: number): number {
    return Math.round((hours / this.fastingScaleMax) * 100);
  }

  weightPosition(weight: number): number {
    const weights = this.progressDays
      .filter((day) => day.hasSavedEntry)
      .map((day) => day.weight);
    if (weights.length === 0 || weight <= 0) {
      return 0;
    }

    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = Math.max(max - min, 1);

    return Math.round(20 + ((weight - min) / range) * 80);
  }

  selectProgressDay(day: ProgressDay): void {
    this.setDraftFromDay(day);
    this.saveMessage = null;
  }

  saveDailyProgress(): void {
    if (!this.progressDraft.date) {
      this.saveMessage = 'Choose a date before saving progress.';
      return;
    }

    if (
      this.progressDraft.weight <= 0 ||
      this.progressDraft.calories < 0 ||
      this.progressDraft.fastingHours < 0
    ) {
      this.saveMessage = 'Enter valid weight, calorie, and fasting values.';
      return;
    }

    const savedEntry = this.userService.saveProgressEntry(this.progressDraft);
    const weightGoals = this.userService.getWeightGoals();
    this.startWeight = weightGoals.startWeight;
    this.currentWeight = weightGoals.currentWeight;
    this.goalWeight = weightGoals.goalWeight;
    this.progressDays = this.buildProgressDays();
    this.setDraftFromEntry(savedEntry);
    this.saveMessage = 'Daily progress saved.';
  }

  deleteDailyProgress(date: string): void {
    this.userService.deleteProgressEntry(date);
    this.progressDays = this.buildProgressDays();
    this.setDraftFromDay(this.progressDays[this.progressDays.length - 1]);
    this.saveMessage = 'Progress entry removed.';
  }

  formatEntryDate(dateKey: string): string {
    return new Date(`${dateKey}T00:00:00`).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  private buildProgressDays(): ProgressDay[] {
    const dates = this.getLastSevenDateKeys();
    const savedEntries = new Map(
      this.userService.getProgressEntries().map((entry) => [entry.date, entry])
    );

    return dates.map((date, index) => {
      const savedEntry = savedEntries.get(date);
      const calories = savedEntry?.calories ?? 0;
      const fastingHours = savedEntry?.fastingHours ?? 0;

      return {
        date,
        day: this.formatDayLabel(date),
        calories,
        fastingHours,
        weight: this.roundOneDecimal(savedEntry?.weight ?? 0),
        adherence: this.calculateAdherence(calories, fastingHours),
        hasSavedEntry: Boolean(savedEntry),
      };
    });
  }

  private calculateAdherence(calories: number, fastingHours: number): number {
    const calorieScore = Math.max(
      0,
      100 - Math.abs(calories - this.calorieTarget) / this.calorieTarget * 100
    );
    const fastingScore = Math.min(100, fastingHours / this.fastingTarget * 100);

    return Math.round(calorieScore * 0.55 + fastingScore * 0.45);
  }

  private setDraftFromDay(day?: ProgressDay): void {
    if (!day) {
      return;
    }

    this.progressDraft = {
      date: day.date,
      weight: day.weight,
      calories: day.calories,
      fastingHours: day.fastingHours,
    };
  }

  private setDraftFromEntry(entry: ProgressEntry): void {
    this.progressDraft = { ...entry };
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

  private roundOneDecimal(value: number): number {
    return Math.round(value * 10) / 10;
  }
}
