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
alert.component.ts

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

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [CommonModule],
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = 'success'; // Default type is 'success'
  showAlert: boolean = true;
  alertClass: string = '';

  ngOnInit(): void {
    this.setAlertClass();
  }

  setAlertClass() {
    switch (this.type) {
      case 'success':
        this.alertClass = 'alert-success';
        break;
      case 'error':
        this.alertClass = 'alert-error';
        break;
      case 'info':
        this.alertClass = 'alert-info';
        break;
      case 'warning':
        this.alertClass = 'alert-warning';
        break;
      default:
        this.alertClass = 'alert-success';
        break;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
