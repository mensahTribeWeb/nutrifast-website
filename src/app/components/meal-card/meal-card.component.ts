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
meal-card.component.ts

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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent {
  @Input() meal!: Meal;
}
