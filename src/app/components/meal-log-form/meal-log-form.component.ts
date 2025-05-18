import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meal-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-log-form.component.html',
  styleUrls: ['./meal-log-form.component.scss'],
})
export class MealLogFormComponent {}
