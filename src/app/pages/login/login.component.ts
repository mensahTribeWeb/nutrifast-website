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
login.component.ts

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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string | null = null;
  showModal = true;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.authService.logout().catch(() => undefined);
    this.clearLoginSession();
  }

  async login(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.error = null;

    if (this.form.invalid) {
      this.error = 'Please fill in valid details.';
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    try {
      this.isSubmitting = true;
      await this.authService.logout().catch(() => undefined);
      this.clearLoginSession();

      const credential = await this.authService.login(email, password);
      this.onLoginSuccess(
        credential.user.displayName,
        credential.user.email,
        credential.user.uid
      );
    } catch (error: unknown) {
      this.clearLoginSession();
      this.error = this.getLoginErrorMessage(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  onLoginSuccess(
    displayName: string | null,
    email: string | null,
    userKey: string
  ): void {
    const fallbackName = email?.split('@')[0] || 'NutriFast User';
    localStorage.setItem('userName', displayName || fallbackName);
    localStorage.setItem('nutrifastUserKey', userKey);
    this.router.navigate(['/dashboard']);
  }

  private clearLoginSession(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('nutrifastUserKey');
  }

  private getLoginErrorMessage(error: unknown): string {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? String((error as { code?: unknown }).code)
        : '';

    if (code.includes('invalid-email')) {
      return 'Enter a valid email address.';
    }

    if (
      code.includes('invalid-credential') ||
      code.includes('user-not-found') ||
      code.includes('wrong-password')
    ) {
      return 'Login failed. Check your email and password.';
    }

    if (code.includes('too-many-requests')) {
      return 'Too many login attempts. Please wait and try again.';
    }

    return 'Login failed. Please try again.';
  }

  closeModal(): void {
    this.clearLoginSession();
    this.router.navigate(['/home']);
  }
}
