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
forgot-password-page.component.ts

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

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  templateUrl: './forgot-password-page.component.html',
  imports: [CommonModule],
})
export class ForgotPasswordPageComponent {
  form: any;

  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submit() {
    const email = this.form.value.email;
    if (!email) return;

    try {
      await sendPasswordResetEmail(this.auth, email);
      this.message = 'Password reset email sent! Please check your inbox.';
      this.error = null;
    } catch (err: any) {
      this.error = err.message;
      this.message = null;
    }
  }
}
