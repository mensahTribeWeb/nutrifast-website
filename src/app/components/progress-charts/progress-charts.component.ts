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
import { UserService } from '../../services/user.service';

type ProgressDay = {
  day: string;
  calories: number;
  fastingHours: number;
  weight: number;
  adherence: number;
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
  imports: [CommonModule],
  templateUrl: './progress-charts.component.html',
  styleUrl: './progress-charts.component.scss',
})
export class ProgressChartsComponent implements OnInit {
  progressDays: ProgressDay[] = [];

  readonly fastingMax = 18;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.progressDays = this.buildProgressDays();
  }

  get calorieMax(): number {
    return Math.max(...this.progressDays.map((day) => day.calories));
  }

  get averageCalories(): number {
    return Math.round(
      this.progressDays.reduce((sum, day) => sum + day.calories, 0) / this.progressDays.length
    );
  }

  get averageFasting(): string {
    return (
      this.progressDays.reduce((sum, day) => sum + day.fastingHours, 0) /
      this.progressDays.length
    ).toFixed(1);
  }

  get averageAdherence(): number {
    return Math.round(
      this.progressDays.reduce((sum, day) => sum + day.adherence, 0) / this.progressDays.length
    );
  }

  get weightDelta(): string {
    const firstDay = this.progressDays[0];
    const lastDay = this.progressDays[this.progressDays.length - 1];
    if (!firstDay || !lastDay) {
      return '0.0';
    }

    return (lastDay.weight - firstDay.weight).toFixed(1);
  }

  get weightDeltaAbs(): string {
    return Math.abs(Number(this.weightDelta)).toFixed(1);
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
        label: 'Weight Change',
        value: `${this.weightDelta} lbs`,
        detail: 'Since Monday',
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

  calorieHeight(calories: number): number {
    return Math.round((calories / this.calorieMax) * 100);
  }

  fastingHeight(hours: number): number {
    return Math.round((hours / this.fastingMax) * 100);
  }

  weightPosition(weight: number): number {
    const weights = this.progressDays.map((day) => day.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = Math.max(max - min, 1);

    return Math.round(20 + ((weight - min) / range) * 80);
  }

  private buildProgressDays(): ProgressDay[] {
    const currentWeight = this.userService.getCurrentWeight(159.4);

    return [
      { day: 'Mon', calories: 1420, fastingHours: 14, weight: currentWeight + 3.0, adherence: 82 },
      { day: 'Tue', calories: 1360, fastingHours: 15, weight: currentWeight + 2.4, adherence: 86 },
      { day: 'Wed', calories: 1280, fastingHours: 16, weight: currentWeight + 1.8, adherence: 91 },
      { day: 'Thu', calories: 1325, fastingHours: 16, weight: currentWeight + 1.4, adherence: 88 },
      { day: 'Fri', calories: 1210, fastingHours: 17, weight: currentWeight + 0.8, adherence: 94 },
      { day: 'Sat', calories: 1490, fastingHours: 14, weight: currentWeight + 0.4, adherence: 80 },
      { day: 'Sun', calories: 1235, fastingHours: 16, weight: currentWeight, adherence: 92 },
    ];
  }

}
