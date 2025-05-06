import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AlertComponent, CommonModule, RouterModule], // ✅ Add RouterModule here
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  userStats = {
    caloriesToday: 0,
    fastingHours: 0,
    weight: 0,
  };

  // Alerts
  showSuccessAlert = false;
  showErrorAlert = false;
  showInfoAlert = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userStats = {
      caloriesToday: 1200,
      fastingHours: 14,
      weight: 160,
    };

    this.showSuccessAlert = true;
    setTimeout(() => (this.showSuccessAlert = false), 3000);
    this.showErrorAlert = true;
    setTimeout(() => (this.showErrorAlert = false), 5000);
    this.showInfoAlert = true;
    setTimeout(() => (this.showInfoAlert = false), 7000);
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
