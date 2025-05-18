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
// import { AuthGuard } from './auth.guard'; // optional

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-stats', component: UserStatsComponent },
  { path: 'analytics-summary', component: AnalyticsSummaryComponent },
  { path: 'settings', component: ProfileSettingsComponent },

  // Lazy-loaded components
  {
    path: 'meal-plan',
    loadComponent: () =>
      import('./components/meal-planner/meal-planner.component').then(
        (m) => m.MealPlannerComponent
      ),
  },

  { path: 'meal-log-form', component: MealLogFormComponent },

  {
    path: 'fasting-tracker',
    loadComponent: () =>
      import('./components/fasting-tracker/fasting-tracker.component').then(
        (m) => m.FastingTrackerComponent
      ),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./components/progress-charts/progress-charts.component').then(
        (m) => m.ProgressChartsComponent
      ),
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('./components/alert/alert.component').then(
        (m) => m.AlertComponent
      ),
  },

  // Wildcard route (404 fallback)
  { path: '**', component: NotFoundComponent },
];
