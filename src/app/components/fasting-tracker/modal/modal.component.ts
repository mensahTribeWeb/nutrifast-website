import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fasting-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class FastingModalComponent implements OnInit {
  @Output() fastingConfirmed = new EventEmitter<{
    startTime: string;
    endTime: string;
    weight: number;
  }>();
  @Output() cancel = new EventEmitter<void>();

  startTime = '';
  endTime = '';
  weight: number | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const now = new Date();
    const end = new Date(now.getTime() + 16 * 60 * 60 * 1000);
    this.startTime = this.formatForInput(now);
    this.endTime = this.formatForInput(end);
  }

  saveFasting(): void {
    this.errorMessage = null;

    if (!this.startTime || !this.endTime || this.weight === null) {
      this.errorMessage = 'Complete all fields before saving.';
      return;
    }

    if (new Date(this.endTime) <= new Date(this.startTime)) {
      this.errorMessage = 'End time must be after start time.';
      return;
    }

    this.fastingConfirmed.emit({
      startTime: this.startTime,
      endTime: this.endTime,
      weight: this.weight,
    });
  }

  cancelModal(): void {
    this.cancel.emit();
  }

  private formatForInput(date: Date): string {
    const offsetMs = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  }
}
