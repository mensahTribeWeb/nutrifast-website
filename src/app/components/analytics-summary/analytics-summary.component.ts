import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-summary',
  templateUrl: './analytics-summary.component.html',
  styleUrls: ['./analytics-summary.component.scss'],
})
export class AnalyticsSummaryComponent implements OnInit {
  // Define weights for start, current, and goal weight
  public startWeight: number = 200; // Example start weight
  public currentWeight: number = 180; // Example current weight
  public goalWeight: number = 150; // Example goal weight

  // Calculate progress percentage
  public progressPercentage: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateProgress();
  }

  // Function to calculate the percentage progress
  calculateProgress(): void {
    if (this.goalWeight && this.startWeight) {
      const weightLost = this.startWeight - this.currentWeight;
      const totalWeightToLose = this.startWeight - this.goalWeight;
      this.progressPercentage = (weightLost / totalWeightToLose) * 100;
    }
  }
}
