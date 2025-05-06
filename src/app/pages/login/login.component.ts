import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  showModal = true; // Modal is visible by default, can be toggled off

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize form with email + password fields and validation
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Called when the user clicks the login button
  login() {
    if (this.form.valid) {
      console.log('Login successful!');

      // Call helper to handle post-login actions
      this.onLoginSuccess();
    } else {
      this.error = 'Please fill in valid details.';
    }
  }

  // Handles actions after successful login
  onLoginSuccess() {
    // Mock user data — in real app, replace with API response
    const user = { name: 'Nick Doe' };

    // Save user name to localStorage for dashboard access
    localStorage.setItem('userName', user.name);

    // Redirect user to dashboard after login
    this.router.navigate(['/dashboard']);
  }

  // Optional: closes modal if you are using it in the template
  closeModal() {
    this.showModal = false;
  }
}
