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
fasting-tracker.component.ts

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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FastingModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-fasting-tracker',
  standalone: true,
  templateUrl: './fasting-tracker.component.html',
  styleUrls: ['./fasting-tracker.component.scss'],
  imports: [CommonModule, FastingModalComponent],
})
export class FastingTrackerComponent implements OnInit, OnDestroy {
  isFasting = false;
  isModalVisible = false;
  targetHours = 16;
  startTime: Date | null = null;
  endTime: Date | null = null;
  lastFastEndedAt: Date | null = null;
  now = Date.now();
  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  startFasting(): void {
    this.startTime = new Date();
    this.endTime = new Date(this.startTime.getTime() + this.targetHours * 60 * 60 * 1000);
    this.isFasting = true;
  }

  stopFasting(): void {
    this.isFasting = false;
    this.lastFastEndedAt = new Date();
    this.startTime = null;
    this.endTime = null;
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  cancelModal(): void {
    this.isModalVisible = false;
  }

  handleCustomFasting(fast: { startTime: string; endTime: string; weight: number }): void {
    this.startTime = new Date(fast.startTime);
    this.endTime = new Date(fast.endTime);
    this.targetHours = Math.max(
      1,
      Math.round((this.endTime.getTime() - this.startTime.getTime()) / 36_000) / 100
    );
    this.isFasting = true;
    this.isModalVisible = false;
  }

  calculateProgressPercentage(): number {
    if (!this.isFasting || !this.startTime || !this.endTime) {
      return 0;
    }

    const totalMs = this.endTime.getTime() - this.startTime.getTime();
    const elapsedMs = this.now - this.startTime.getTime();
    return Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  }

  getProgressBackground(): string {
    const progress = this.calculateProgressPercentage();
    return `conic-gradient(#4caf50 ${progress}%, #1e3a8a ${progress}% 100%)`;
  }

  formatElapsedTime(): string {
    if (this.isFasting && this.startTime) {
      return this.formatClockTime(this.now - this.startTime.getTime());
    }

    if (this.lastFastEndedAt) {
      return this.formatClockTime(this.now - this.lastFastEndedAt.getTime());
    }

    return '00:00:00';
  }

  formatRemainingTime(): string {
    if (!this.isFasting || !this.endTime) {
      return `${this.targetHours} hour target`;
    }

    return this.formatClockTime(Math.max(0, this.endTime.getTime() - this.now));
  }

  private formatClockTime(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((value) => value.toString().padStart(2, '0'))
      .join(':');
  }
}
