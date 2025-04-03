import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FastingModalComponent } from './modal/modal.component'; // Ensure correct relative path

@Component({
  selector: 'app-fasting-tracker',
  standalone: true,
  templateUrl: './fasting-tracker.component.html',
  styleUrls: ['./fasting-tracker.component.scss'],
  imports: [CommonModule, FastingModalComponent], // Import modal component here
})
export class FastingTrackerComponent implements OnInit {
  // Removed duplicate implementation of formatElapsedTime
  isFasting: boolean = false;
  isModalVisible: boolean = false; // Controls modal visibility
  alertMessage: string = 'Please confirm to start your fast.';
  isAlertVisible: boolean = true; // Controls the alert visibility

  constructor() {}

  ngOnInit(): void {}

  // Show the modal
  showModal() {
    this.isModalVisible = true;
  }

  // Hide the modal
  cancelModal() {
    this.isModalVisible = false;
  }

  // Start fasting logic
  startFasting() {
    this.isFasting = true;
    // Add additional logic to track fasting progress
  }

  // Stop fasting logic
  stopFasting() {
    this.isFasting = false;
    // Reset progress or perform additional actions
  }

  // Logic for starting fast when alert confirms
  confirmStartFasting() {
    this.isAlertVisible = false;
    this.startFasting();
  }

  // Cancel alert
  cancelAlert() {
    this.isAlertVisible = false;
  }

  // Calculate the fasting progress percentage (for the progress ring)
  calculateProgressPercentage(): number {
    return 75; // Placeholder
  }

  // Format the elapsed time (you can use actual logic for time formatting)
  formatElapsedTime(): string {
    return '4 hours 32 minutes'; // Placeholder
  }
}
