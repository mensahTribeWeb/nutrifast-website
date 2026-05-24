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
navbar.component.ts

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
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent implements OnInit {
  closeMenu() {
    this.showMobileMenu = false;
  }

  showNavbar = true;
  lastScrollTop = 0;
  userLoggedIn = false;
  showMobileMenu = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userLoggedIn = !!localStorage.getItem('userName');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.showNavbar = scrollTop <= this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    localStorage.removeItem('userName');
    localStorage.removeItem('nutrifastUserKey');
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }

  navigateAndCloseMenu(path: string): void {
    this.showMobileMenu = false;
    this.router.navigate([path]);
  }
}
