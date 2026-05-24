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
auth.service.ts

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

import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  // Login method using email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Signup method that also sends a verification email
  async signup(email: string, password: string, displayName?: string) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }

      await sendEmailVerification(cred.user); // Send verification email after signup
      return cred;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error; // Propagate error to be handled by the component
    }
  }

  // Logout method
  logout() {
    return signOut(this.auth);
  }
}
