import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

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

  logout(): void {
    localStorage.removeItem('userName');
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }

  navigateAndCloseMenu(path: string): void {
    this.showMobileMenu = false;
    this.router.navigate([path]);
  }
}
