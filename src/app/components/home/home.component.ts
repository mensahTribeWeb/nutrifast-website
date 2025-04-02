import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string =
    'Welcome to NutriFast: Your Personalized Meal Planner & Fasting Assistant';
  description: string =
    'Optimize your health with smart meal planning and fasting.';
  buttonText1: string = 'Get Started';
  buttonLink1: string = '/signup';
  buttonText2: string = 'Learn More';
  buttonLink2: string = '/about';

  constructor() {}

  ngOnInit(): void {}
}
