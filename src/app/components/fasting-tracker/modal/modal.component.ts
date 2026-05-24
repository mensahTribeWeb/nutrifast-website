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
modal.component.ts

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
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fasting-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class FastingModalComponent implements OnInit {
  @Output() fastingConfirmed = new EventEmitter<{
    startTime: string;
    endTime: string;
    weight: number;
  }>();
  @Output() cancel = new EventEmitter<void>();

  startTime = '';
  endTime = '';
  weight: number | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const now = new Date();
    const end = new Date(now.getTime() + 16 * 60 * 60 * 1000);
    this.startTime = this.formatForInput(now);
    this.endTime = this.formatForInput(end);
  }

  saveFasting(): void {
    this.errorMessage = null;

    if (!this.startTime || !this.endTime || this.weight === null) {
      this.errorMessage = 'Complete all fields before saving.';
      return;
    }

    if (new Date(this.endTime) <= new Date(this.startTime)) {
      this.errorMessage = 'End time must be after start time.';
      return;
    }

    this.fastingConfirmed.emit({
      startTime: this.startTime,
      endTime: this.endTime,
      weight: this.weight,
    });
  }

  cancelModal(): void {
    this.cancel.emit();
  }

  private formatForInput(date: Date): string {
    const offsetMs = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  }
}
