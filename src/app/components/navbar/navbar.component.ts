import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit {
  showNavbar = true; // Navbar visibility on scroll
  lastScrollTop = 0; // Keep track of scroll position
  userLoggedIn = false; // Set user login state (use actual logic here)
  showMobileMenu = false; // Toggle for mobile menu visibility

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // If scrolling down, hide navbar
      this.showNavbar = false;
    } else {
      // If scrolling up, show navbar
      this.showNavbar = true;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Ensure correct behavior for mobile or negative scroll
  }

  toggleMenu() {
    // Toggle the mobile menu visibility
    this.showMobileMenu = !this.showMobileMenu;
  }
}
