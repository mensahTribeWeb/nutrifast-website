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
import { Component } from '@angular/core';
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
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  showModal = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login(): Promise<void> {
    if (this.form.invalid) {
      this.error = 'Please fill in valid details.';
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    try {
      const credential = await this.authService.login(email, password);
      this.onLoginSuccess(
        credential.user.displayName,
        credential.user.email,
        credential.user.uid
      );
    } catch {
      this.error = 'Login failed. Check your email and password.';
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

  closeModal(): void {
    this.showModal = false;
  }
}
