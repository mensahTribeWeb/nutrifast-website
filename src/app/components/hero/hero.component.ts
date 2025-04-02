// src/app/components/hero/hero.component.ts

import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [BrowserModule, RouterModule],
})
export class HeroComponent {
  title: string = 'Your Personalized Meal Planner & Fasting Assistant';
  description: string =
    'NutriFast helps you stay on track with your nutrition and fasting goals. Tailored just for you.';
  buttonText1: string = 'Get Started';
  buttonText2: string = 'Learn More';
  buttonLink1: string = '/signup';
  buttonLink2: string = '/about';
}
