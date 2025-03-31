import { Routes } from '@angular/router';

// Eager-loaded pages

import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page/forgot-password-page.component';
// Ensure the correct path to the ForgotPasswordPageComponent
// Lazy-loaded
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  // {
  //   path: 'signup',
  //   component: SignupPageComponent,
  // },
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
