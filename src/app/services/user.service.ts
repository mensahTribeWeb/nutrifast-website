import { Injectable } from '@angular/core';

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
export class UserService {
  private readonly legacyUserProfileKey = 'userProfile';

  constructor() {}

  getUserProfile(): UserProfile | null {
    try {
      const profile =
        localStorage.getItem(this.activeProfileKey) ||
        localStorage.getItem(this.legacyUserProfileKey);
      if (profile) {
        return JSON.parse(profile);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user profile from localStorage', error);
      return null;
    }
  }

  saveUserProfile(profile: UserProfile): void {
    try {
      const normalizedProfile = {
        ...profile,
        userName: profile.userName || this.currentUserName,
      };

      localStorage.setItem(this.activeProfileKey, JSON.stringify(normalizedProfile));
      localStorage.setItem(this.legacyUserProfileKey, JSON.stringify(normalizedProfile));
      localStorage.setItem('userName', normalizedProfile.userName);

      const weight = Number(profile.weight);
      if (weight > 0) {
        localStorage.setItem('currentWeight', (Math.round(weight * 10) / 10).toString());
      }

      window.dispatchEvent(
        new CustomEvent('nutrifastProfileUpdated', { detail: normalizedProfile })
      );
    } catch (error) {
      console.error('Error saving user profile to localStorage', error);
    }
  }

  updateUserProfile(updatedData: Partial<UserProfile>): void {
    const currentProfile = this.getUserProfile();
    if (currentProfile) {
      const newProfile = { ...currentProfile, ...updatedData };
      this.saveUserProfile(newProfile);
    } else {
      console.warn('No profile found to update');
    }
  }

  clearUserProfile(): void {
    localStorage.removeItem(this.activeProfileKey);
    localStorage.removeItem(this.legacyUserProfileKey);
  }

  initializeDefaultProfile(): void {
    if (!this.getUserProfile()) {
      this.saveUserProfile(this.getDefaultProfile());
    }
  }

  getDefaultProfile(): UserProfile {
    const storedWeight = Number(localStorage.getItem('currentWeight'));

    return {
      userName: this.currentUserName,
      age: 30,
      gender: 'female',
      height: 66,
      weight: storedWeight > 0 ? storedWeight : 159.4,
      activityLevel: 'moderate',
      goal: 'weightLoss',
      dietType: 'regular',
      fastingType: '16:8',
      eatingStart: '12:00',
      eatingEnd: '20:00',
    };
  }

  private get activeProfileKey(): string {
    return `userProfile:${this.currentUserKey}`;
  }

  private get currentUserName(): string {
    return localStorage.getItem('userName') || 'Nick Doe';
  }

  private get currentUserKey(): string {
    return this.currentUserName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'guest';
  }
}
