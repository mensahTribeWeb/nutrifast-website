import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router service
import { AlertComponent } from '../../components/alert/alert.component'; // Import Alert component
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AlertComponent, CommonModule], // Import CommonModule here
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  showInfoAlert: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve the user's name from localStorage when the dashboard is loaded
    this.userName = localStorage.getItem('userName');

    // Automatically show alerts when the dashboard loads (optional)
    this.showSuccessAlert = true; // You can replace this with logic based on your conditions
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000); // Hide after 3 seconds

    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 5000); // Hide after 5 seconds

    this.showInfoAlert = true;
    setTimeout(() => {
      this.showInfoAlert = false;
    }, 7000); // Hide after 7 seconds
  }

  logout() {
    // Clear user name from localStorage
    localStorage.removeItem('userName');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
