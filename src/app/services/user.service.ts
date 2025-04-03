import { Injectable } from '@angular/core';

interface UserProfile {
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
export class UserService {
  private userProfileKey = 'userProfile'; // Key for local storage

  constructor() {}

  // Get user profile from local storage
  getUserProfile(): UserProfile | null {
    try {
      const profile = localStorage.getItem(this.userProfileKey);
      if (profile) {
        return JSON.parse(profile);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user profile from localStorage', error);
      return null;
    }
  }

  // Save user profile to local storage
  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(this.userProfileKey, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile to localStorage', error);
    }
  }

  // Update user profile (overwrite or merge data)
  updateUserProfile(updatedData: Partial<UserProfile>): void {
    const currentProfile = this.getUserProfile();
    if (currentProfile) {
      const newProfile = { ...currentProfile, ...updatedData };
      this.saveUserProfile(newProfile);
    } else {
      console.warn('No profile found to update');
    }
  }

  // Clear user profile data (logout)
  clearUserProfile(): void {
    localStorage.removeItem(this.userProfileKey);
  }

  // Set default profile if no profile is found in localStorage
  initializeDefaultProfile(): void {
    const defaultProfile: UserProfile = {
      userName: 'John Doe',
      age: 25,
      gender: 'male',
      height: 180,
      weight: 75,
      activityLevel: 'moderate',
      goal: 'weightLoss',
      dietType: 'regular',
      fastingType: '16:8',
    };

    // Save default profile if none exists in localStorage
    if (!this.getUserProfile()) {
      this.saveUserProfile(defaultProfile);
    }
  }
}
