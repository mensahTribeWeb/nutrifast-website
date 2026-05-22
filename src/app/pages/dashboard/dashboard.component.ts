import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

type StatCard = {
  label: string;
  value: string;
  detail: string;
  tone: 'gold' | 'green' | 'blue';
  action?: 'weight';
};

type FeatureCard = {
  title: string;
  description: string;
  action: string;
  route: string;
  status: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  userName = 'Nick Doe';
  currentWeight = 159.4;
  startingWeight = 162.4;
  isWeightEditorOpen = false;
  weightInput: number | null = null;
  weightMessage: string | null = null;

  get statCards(): StatCard[] {
    return [
      {
        label: 'Calories Today',
        value: '1200 kcal',
        detail: '131 kcal below target',
        tone: 'gold',
      },
      {
        label: 'Fasting Goal',
        value: '16:00:00',
        detail: 'Standard daily window',
        tone: 'green',
      },
      {
        label: 'Current Weight',
        value: `${this.currentWeight.toFixed(1)} lbs`,
        detail: this.weightTrendDetail,
        tone: 'blue',
        action: 'weight',
      },
    ];
  }

  readonly featureCards: FeatureCard[] = [
    {
      title: 'Log a Meal',
      description: 'Search the nutrition dataset and save meal macros.',
      action: 'Log Meal',
      route: '/meal-log-form',
      status: 'USDA lookup ready',
    },
    {
      title: 'AI Meal Suggestions',
      description: 'Get ranked meal ideas based on calorie and macro goals.',
      action: 'Try AI Planner',
      route: '/meal-ai',
      status: 'Recommendations live',
    },
    {
      title: 'Fasting Tracker',
      description: 'Start a fast, track seconds, or set a custom schedule.',
      action: 'Go to Tracker',
      route: '/fasting-tracker',
      status: '16 hour target',
    },
    {
      title: 'Progress Dashboard',
      description: 'Review weekly weight, calories, fasting, and adherence.',
      action: 'View Progress',
      route: '/progress',
      status: '7 day trends',
    },
    {
      title: 'Analytics Summary',
      description: 'Review deeper performance stats and weekly patterns.',
      action: 'View Analytics',
      route: '/analytics-summary',
      status: 'Insights available',
    },
    {
      title: 'Profile Settings',
      description: 'Manage your account, goals, and personal preferences.',
      action: 'Edit Profile',
      route: '/settings',
      status: 'Profile active',
    },
    {
      title: 'Alerts & Notifications',
      description: 'Check hydration, fasting, and meal reminder alerts.',
      action: 'View Alerts',
      route: '/alert',
      status: 'No urgent alerts',
    },
  ];

  get insightItems(): string[] {
    return [
      'Protein goal is on track for today.',
      'Your fasting consistency is strongest on weekdays.',
      `Weight trend: ${this.weightTrendDetail.toLowerCase()}.`,
    ];
  }

  @ViewChildren('featureCard') featureCardsRef!: ElementRef[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'Nick Doe';
    this.currentWeight = this.loadCurrentWeight();
    this.weightInput = this.currentWeight;
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    });

    this.featureCardsRef.forEach((card) => observer.observe(card.nativeElement));
  }

  logout(): void {
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  openWeightEditor(): void {
    this.weightInput = this.currentWeight;
    this.weightMessage = null;
    this.isWeightEditorOpen = true;
  }

  closeWeightEditor(): void {
    this.isWeightEditorOpen = false;
    this.weightMessage = null;
  }

  saveWeight(): void {
    if (!this.weightInput || this.weightInput <= 0) {
      this.weightMessage = 'Enter a valid weight.';
      return;
    }

    this.currentWeight = Math.round(this.weightInput * 10) / 10;
    localStorage.setItem('currentWeight', this.currentWeight.toString());
    this.syncProfileWeight(this.currentWeight);
    this.weightMessage = 'Weight updated.';
    this.isWeightEditorOpen = false;
  }

  private get weightTrendDetail(): string {
    const delta = Math.round((this.currentWeight - this.startingWeight) * 10) / 10;
    const absDelta = Math.abs(delta).toFixed(1);

    if (delta === 0) {
      return 'No change this week';
    }

    return delta < 0 ? `Down ${absDelta} lbs this week` : `Up ${absDelta} lbs this week`;
  }

  private loadCurrentWeight(): number {
    const storedWeight = Number(localStorage.getItem('currentWeight'));
    if (storedWeight > 0) {
      return storedWeight;
    }

    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        const profileWeight = Number(profile?.weight);
        if (profileWeight > 0) {
          return profileWeight;
        }
      } catch {
        return this.currentWeight;
      }
    }

    return this.currentWeight;
  }

  private syncProfileWeight(weight: number): void {
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      return;
    }

    try {
      const profile = JSON.parse(storedProfile);
      localStorage.setItem('userProfile', JSON.stringify({ ...profile, weight }));
    } catch {
      localStorage.setItem('currentWeight', weight.toString());
    }
  }
}
