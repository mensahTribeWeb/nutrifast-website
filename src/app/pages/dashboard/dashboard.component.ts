import {
  Component,
  QueryList,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  userName: string | null = '';
  userStats = {
    caloriesToday: 0,
    fastingHours: 0,
    weight: 0,
  };

  @ViewChildren('featureCard') featureCards!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userStats = {
      caloriesToday: 1200,
      fastingHours: 14,
      weight: 160,
    };
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    this.featureCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
