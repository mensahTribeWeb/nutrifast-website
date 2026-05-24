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
user.service.ts

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
import { Meal, SavedMeal } from '../models/meal.model';

export interface UserProfile {
  userName: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  dietType: string;
  allergies?: string;
  cuisinePref?: string;
  fastingType: string;
  eatingStart?: string;
  eatingEnd?: string;
}

@Injectable({
  providedIn: 'root',
})
/**
 * Stores prototype user profile, weight, and meal-log data under the active user key.
 *
 * Firebase handles authentication, while this service keeps capstone prototype data
 * separated per signed-in user inside browser storage.
 */
export class UserService {
  /** Return the active user's saved profile, or null when none has been created. */
  getUserProfile(): UserProfile | null {
    try {
      const profile = localStorage.getItem(this.activeProfileKey);
      if (profile) {
        return JSON.parse(profile);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user profile from localStorage', error);
      return null;
    }
  }

  /** Save profile details and keep the scoped current-weight value synchronized. */
  saveUserProfile(profile: UserProfile): void {
    try {
      const normalizedProfile = {
        ...profile,
        userName: profile.userName || this.currentUserName,
      };

      localStorage.setItem(this.activeProfileKey, JSON.stringify(normalizedProfile));
      localStorage.setItem('userName', normalizedProfile.userName);

      const weight = Number(profile.weight);
      if (weight > 0) {
        this.saveCurrentWeight(weight);
      }

      window.dispatchEvent(
        new CustomEvent('nutrifastProfileUpdated', { detail: normalizedProfile })
      );
    } catch (error) {
      console.error('Error saving user profile to localStorage', error);
    }
  }

  /** Merge partial edits into the active user's profile. */
  updateUserProfile(updatedData: Partial<UserProfile>): void {
    const currentProfile = this.getUserProfile();
    if (currentProfile) {
      const newProfile = { ...currentProfile, ...updatedData };
      this.saveUserProfile(newProfile);
    } else {
      console.warn('No profile found to update');
    }
  }

  /** Remove profile, weight, and meal-log data for the active browser user scope. */
  clearUserProfile(): void {
    localStorage.removeItem(this.activeProfileKey);
    localStorage.removeItem(this.activeWeightKey);
    localStorage.removeItem(this.activeMealsKey);
  }

  /** Create a default profile only when the active user does not already have one. */
  initializeDefaultProfile(): void {
    if (!this.getUserProfile()) {
      this.saveUserProfile(this.getDefaultProfile());
    }
  }

  /** Build neutral starter values for a new capstone prototype profile. */
  getDefaultProfile(): UserProfile {
    return {
      userName: this.currentUserName,
      age: 30,
      gender: 'other',
      height: 66,
      weight: this.getCurrentWeight(159.4),
      activityLevel: 'moderate',
      goal: 'weightLoss',
      dietType: 'regular',
      fastingType: '16:8',
      eatingStart: '12:00',
      eatingEnd: '20:00',
    };
  }

  /** Return the active user's saved weight, falling back to the provided value. */
  getCurrentWeight(fallbackWeight: number): number {
    const scopedWeight = Number(localStorage.getItem(this.activeWeightKey));
    if (scopedWeight > 0) {
      return scopedWeight;
    }

    const profileWeight = Number(this.getUserProfile()?.weight);
    return profileWeight > 0 ? profileWeight : fallbackWeight;
  }

  /** Persist the active user's current weight and mirror it into the saved profile. */
  saveCurrentWeight(weight: number): void {
    const normalizedWeight = Math.round(weight * 10) / 10;
    localStorage.setItem(this.activeWeightKey, normalizedWeight.toString());

    const profile = this.getUserProfile();
    if (profile) {
      localStorage.setItem(
        this.activeProfileKey,
        JSON.stringify({ ...profile, weight: normalizedWeight })
      );
    }
  }

  /** Return the active user's saved meal history in newest-first order. */
  getSavedMeals(): SavedMeal[] {
    try {
      const savedMeals = localStorage.getItem(this.activeMealsKey);
      return savedMeals ? JSON.parse(savedMeals) : [];
    } catch (error) {
      console.error('Error parsing saved meals from localStorage', error);
      return [];
    }
  }

  /** Save one meal log for the active user and return the stored record. */
  saveMealLog(meal: Meal): SavedMeal {
    const savedMeal: SavedMeal = {
      ...meal,
      logId: this.createLogId(),
      loggedAt: new Date().toISOString(),
    };
    const updatedMeals = [savedMeal, ...this.getSavedMeals()].slice(0, 25);
    localStorage.setItem(this.activeMealsKey, JSON.stringify(updatedMeals));
    return savedMeal;
  }

  /** Remove one saved meal log from the active user's browser-scoped history. */
  deleteMealLog(logId: string): void {
    const updatedMeals = this.getSavedMeals().filter((meal) => meal.logId !== logId);
    localStorage.setItem(this.activeMealsKey, JSON.stringify(updatedMeals));
  }

  private get activeProfileKey(): string {
    return `userProfile:${this.activeUserKey}`;
  }

  private get activeWeightKey(): string {
    return `currentWeight:${this.activeUserKey}`;
  }

  private get activeMealsKey(): string {
    return `savedMeals:${this.activeUserKey}`;
  }

  private get currentUserName(): string {
    return localStorage.getItem('userName') || 'NutriFast User';
  }

  private get activeUserKey(): string {
    return localStorage.getItem('nutrifastUserKey') || this.currentUserKey;
  }

  private get currentUserKey(): string {
    return this.currentUserName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'guest';
  }

  private createLogId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
