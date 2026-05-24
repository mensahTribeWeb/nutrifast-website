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
auth.guard.spec.ts

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

import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let afAuthMock: jasmine.SpyObj<AngularFireAuth>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create spies for dependencies
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState']);
    // afAuthMock.authState.and.returnValue(of(null));
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    // Inject the guard
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is authenticated', (done) => {
    // afAuthMock.authState.and.returnValue(of({ uid: '12345' })); // Mock authenticated user

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should prevent activation and redirect if user is not authenticated', (done) => {
    // afAuthMock.authState.and.returnValue(of(null)); // Mock unauthenticated user

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeFalsy();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });
});
