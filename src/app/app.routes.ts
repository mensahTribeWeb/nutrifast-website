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
app.routes.ts

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

// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page/forgot-password-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { LoginComponent } from './pages/login/login.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { AnalyticsSummaryComponent } from './components/analytics-summary/analytics-summary.component';
import { MealLogFormComponent } from './components/meal-log-form/meal-log-form.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'register', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signin', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-stats', component: UserStatsComponent, canActivate: [AuthGuard] },
  {
    path: 'analytics-summary',
    component: AnalyticsSummaryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },

  // Lazy-loaded components
  {
    path: 'meal-plan',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/meal-planner/meal-planner.component').then(
        (m) => m.MealPlannerComponent
      ),
  },

  { path: 'meal-log-form', component: MealLogFormComponent, canActivate: [AuthGuard] },

  {
    path: 'fasting-tracker',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/fasting-tracker/fasting-tracker.component').then(
        (m) => m.FastingTrackerComponent
      ),
  },
  {
    path: 'progress',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/progress-charts/progress-charts.component').then(
        (m) => m.ProgressChartsComponent
      ),
  },
  {
    path: 'meal-ai',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        './components/meal-ai-suggestions/meal-ai-suggestions.component'
      ).then((m) => m.MealAiSuggestionsComponent),
    title: 'AI Meal Suggestions',
  },

  // Wildcard route (404 fallback)
  { path: '**', component: NotFoundComponent, title: 'Page Not Found | NutriFast' },
];
