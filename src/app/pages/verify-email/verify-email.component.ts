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
verify-email.component.ts

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
import { Auth } from '@angular/fire/auth';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  message: string | null = null;

  constructor(private auth: Auth) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        this.message = 'Verification email sent! Please check your inbox.';
      } catch (error: any) {
        this.message = 'Failed to send verification email.';
      }
    } else {
      this.message = 'Email already verified or user not logged in.';
    }
  }
}
