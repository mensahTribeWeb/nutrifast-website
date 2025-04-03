import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fasting-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [FormsModule],
})
export class FastingModalComponent {
  @Output() fastingConfirmed = new EventEmitter<{
    startTime: string;
    endTime: string;
    weight: number;
  }>();
  @Output() cancel = new EventEmitter<void>();

  startTime: string = '';
  endTime: string = '';
  weight: number | null = null;

  // Save fasting data and emit event to parent
  saveFasting() {
    if (this.startTime && this.endTime && this.weight) {
      this.fastingConfirmed.emit({
        startTime: this.startTime,
        endTime: this.endTime,
        weight: this.weight,
      });
    } else {
      alert('Please fill in all fields');
    }
  }

  // Emit cancel event
  cancelModal() {
    this.cancel.emit();
  }
}
