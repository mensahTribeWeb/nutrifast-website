import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router service

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';

  // Injecting the Router into the constructor
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve the user's name from localStorage when the dashboard is loaded
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    // Clear user name from localStorage
    localStorage.removeItem('userName');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
