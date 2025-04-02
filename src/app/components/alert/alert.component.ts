import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [CommonModule],
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = 'success'; // Default type is 'success'
  showAlert: boolean = true;
  alertClass: string = '';

  ngOnInit(): void {
    this.setAlertClass();
  }

  setAlertClass() {
    switch (this.type) {
      case 'success':
        this.alertClass = 'alert-success';
        break;
      case 'error':
        this.alertClass = 'alert-error';
        break;
      case 'info':
        this.alertClass = 'alert-info';
        break;
      case 'warning':
        this.alertClass = 'alert-warning';
        break;
      default:
        this.alertClass = 'alert-success';
        break;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}
