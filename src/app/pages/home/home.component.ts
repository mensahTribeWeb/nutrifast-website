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
home.component.ts

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
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    CallToActionComponent,
    GalleryComponent,
    TestimonialsComponent,
    RouterModule,
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title: string = 'Welcome to NutriFast';
  description: string = 'Optimize your health with smart meal planning.';
  buttonText1: string = 'Get Started';
  buttonLink1: string = '/signup';
  buttonText2: string = 'Learn More';
  buttonLink2: string = '/about';
}
