import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { SignupPageComponent } from './pages/signup/signup-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings/profile-settings-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'profile-settings', component: ProfileSettingsPageComponent },
  { path: '**', component: NotFoundPageComponent }, // wildcard 404
];
