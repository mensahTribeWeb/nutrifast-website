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
health-tracker.component.spec.ts

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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrackerComponent } from './health-tracker.component';

describe('HealthTrackerComponent', () => {
  let component: HealthTrackerComponent;
  let fixture: ComponentFixture<HealthTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
