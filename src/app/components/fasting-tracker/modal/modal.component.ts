import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fasting-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class FastingModalComponent {
  isModalVisible: boolean = true; // or false, depending on when you show it

  @Output() fastingConfirmed = new EventEmitter<{
    startTime: string;
    endTime: string;
    weight: number;
  }>();
  @Output() cancel = new EventEmitter<void>();

  startTime: string = '';
  endTime: string = '';
  weight: number | null = null;

  saveFasting() {
    if (this.startTime && this.endTime && this.weight) {
      this.fastingConfirmed.emit({
        startTime: this.startTime,
        endTime: this.endTime,
        weight: this.weight,
      });
      this.isModalVisible = false; // hide modal after saving
    } else {
      alert('Please fill in all fields');
    }
  }

  cancelModal() {
    this.cancel.emit();
    this.isModalVisible = false; // hide modal on cancel
  }
}
