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
signup.component.ts

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
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.error = null;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.error = this.signupForm.hasError('passwordMismatch')
        ? 'Passwords do not match.'
        : 'Please correct the highlighted fields before signing up.';
      return;
    }

    const { fullName, email, password } = this.signupForm.getRawValue();

    try {
      const credential = await this.authService.signup(email, password, fullName);
      localStorage.setItem('userName', fullName);
      localStorage.setItem('nutrifastUserKey', credential.user.uid);
      this.router.navigate(['/dashboard']);
    } catch {
      this.error = 'Account creation failed. Try another email or password.';
    }
  }

  shouldShowError(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
