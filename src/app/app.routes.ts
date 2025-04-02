import { NgModule } from '@angular/core'; // Import NgModule
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes

import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page/forgot-password-page.component';
import { SignupComponent } from './pages/signup/signup.component';

// import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
// import { ProfileSettingsPageComponent } from './pages/profile-settings/profile-settings-page/profile-settings-page.component';
// import { NotFoundPageComponent } from './pages/not-found/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
  // {
  //   path: 'dashboard',
  //   component: DashboardPageComponent,
  // },
  // {
  //   path: 'profile-settings',
  //   component: ProfileSettingsPageComponent,
  // },
  // {
  //   path: '**',
  //   component: NotFoundPageComponent,
  // },
];
