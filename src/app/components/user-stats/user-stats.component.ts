import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss'],
  imports: [CommonModule],
})
export class UserStatsComponent implements OnInit {
  userStats: any = {}; // Initialize userStats to avoid undefined errors
  router: Router;

  constructor(private userService: UserService, private _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
    this.userStats = this.userService.getUserProfile(); // Get profile on init
    if (!this.userStats) {
      console.error('User profile not found!');
    }
  }

  goToProfileSettings() {
    this.router.navigate(['/settings']); // Navigate to profile settings page
  }
}
