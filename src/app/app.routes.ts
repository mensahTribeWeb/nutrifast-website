import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page/forgot-password-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component'; // Correct import
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { AlertComponent } from './components/alert/alert.component';
import { AnalyticsSummaryComponent } from './components/analytics-summary/analytics-summary.component'; // Adjust based on the correct path

import { LoginComponent } from './pages/login/login.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';

import { Router } from '@angular/router';
import { UserService } from './services/user.service';

export class AppRoutes {
  constructor(
    private router: Router,
    private userProfileService: UserService
  ) {}
}

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'settings', component: ProfileSettingsComponent },
  { path: 'user-stats', component: UserStatsComponent },
  { path: 'alert', component: AlertComponent },

  {
    path: 'analytics-summary',
    component: AnalyticsSummaryComponent,
  },
  {
    path: 'fasting-tracker',
    loadComponent: () =>
      import('./components/fasting-tracker/fasting-tracker.component').then(
        (m) => m.FastingTrackerComponent
      ),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
