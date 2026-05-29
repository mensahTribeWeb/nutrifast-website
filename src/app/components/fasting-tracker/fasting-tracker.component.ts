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
  lastFastDurationMs: number | null = null;
  scheduledWeight: number | null = null;
  now = Date.now();
  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.now = Date.now();
      this.syncFastState();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  startFasting(): void {
    this.now = Date.now();
    this.startTime = new Date(this.now);
    this.endTime = new Date(this.startTime.getTime() + this.targetHours * 60 * 60 * 1000);
    this.isFasting = true;
    this.lastFastDurationMs = null;
    this.scheduledWeight = null;
  }

  stopFasting(): void {
    this.now = Date.now();
    const started = this.startTime && this.now >= this.startTime.getTime();

    if (this.startTime && started) {
      this.lastFastDurationMs = Math.max(0, this.now - this.startTime.getTime());
      this.lastFastEndedAt = new Date(this.now);
    } else {
      this.lastFastDurationMs = null;
      this.lastFastEndedAt = null;
      this.scheduledWeight = null;
    }

    this.isFasting = false;
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
    this.now = Date.now();
    this.targetHours = Math.max(
      1,
      Math.round((this.endTime.getTime() - this.startTime.getTime()) / 36_000) / 100
    );
    this.isFasting = true;
    this.scheduledWeight = fast.weight;
    this.lastFastDurationMs = null;
    this.isModalVisible = false;
    this.syncFastState();
  }

  calculateProgressPercentage(): number {
    if (!this.isActiveFast() || !this.startTime || !this.endTime) {
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
    if (this.isActiveFast() && this.startTime) {
      return this.formatClockTime(this.now - this.startTime.getTime());
    }

    return '00:00:00';
  }

  formatRemainingTime(): string {
    if (this.isScheduledFast()) {
      return `${this.targetHours} hour window`;
    }

    if (!this.isActiveFast() || !this.endTime) {
      return `${this.targetHours} hour target`;
    }

    return this.formatClockTime(Math.max(0, this.endTime.getTime() - this.now));
  }

  formatRingTime(): string {
    if (this.isScheduledFast() && this.startTime) {
      return this.formatClockTime(this.startTime.getTime() - this.now);
    }

    return this.formatElapsedTime();
  }

  getHeading(): string {
    if (this.isScheduledFast()) {
      return 'Fast Scheduled';
    }

    if (this.isActiveFast()) {
      return "You're Fasting";
    }

    if (this.lastFastDurationMs !== null) {
      return 'Fast Complete';
    }

    return 'Get Ready to Fast';
  }

  getSubheading(): string {
    if (this.isScheduledFast()) {
      return 'Your custom fasting window is saved and ready to start.';
    }

    if (this.isActiveFast()) {
      return 'Stay hydrated and keep an eye on your remaining window.';
    }

    return 'Start a standard fast or create a custom schedule.';
  }

  getRingLabel(): string {
    if (this.isScheduledFast()) {
      return 'Starts in';
    }

    if (this.isActiveFast()) {
      return 'Elapsed';
    }

    if (this.lastFastDurationMs !== null) {
      return 'Complete';
    }

    return 'Ready';
  }

  formatLastFastDuration(): string {
    if (this.lastFastDurationMs === null) {
      return 'No fast saved yet';
    }

    return `${this.formatClockTime(this.lastFastDurationMs)} completed`;
  }

  formatDateTimeLabel(time: Date | null): string {
    if (!time) {
      return 'Not started';
    }

    return time.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  formatWeightLabel(): string {
    if (this.scheduledWeight === null) {
      return 'Not entered';
    }

    return `${this.scheduledWeight.toLocaleString(undefined, {
      maximumFractionDigits: 1,
    })} lbs`;
  }

  getStatusLabel(): string {
    if (this.isScheduledFast()) {
      return 'Scheduled fast';
    }

    if (this.isActiveFast()) {
      return 'Active fast';
    }

    if (this.lastFastDurationMs !== null) {
      return 'Fast complete';
    }

    return 'Not fasting';
  }

  getPrimaryActionLabel(): string {
    if (this.isScheduledFast()) {
      return 'Cancel Schedule';
    }

    if (this.isActiveFast()) {
      return 'End Fast';
    }

    return 'Start Fast';
  }

  isScheduledFast(): boolean {
    return Boolean(this.isFasting && this.startTime && this.now < this.startTime.getTime());
  }

  isActiveFast(): boolean {
    return Boolean(
      this.isFasting &&
        this.startTime &&
        this.endTime &&
        this.now >= this.startTime.getTime() &&
        this.now < this.endTime.getTime()
    );
  }

  private syncFastState(): void {
    if (!this.isFasting || !this.startTime || !this.endTime) {
      return;
    }

    if (this.now >= this.endTime.getTime()) {
      this.completeFast(this.endTime.getTime());
    }
  }

  private completeFast(completedAtMs: number): void {
    if (this.startTime) {
      this.lastFastDurationMs = Math.max(0, completedAtMs - this.startTime.getTime());
    }

    this.lastFastEndedAt = new Date(completedAtMs);
    this.isFasting = false;
    this.startTime = null;
    this.endTime = null;
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
