import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  showModal = true; // Modal will be visible by default, can be toggled

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      // Your login logic here
      console.log('Login successful!');
      this.closeModal(); // Close the modal after login
    } else {
      this.error = 'Please fill in valid details.';
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
