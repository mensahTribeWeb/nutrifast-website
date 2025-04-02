import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      // Mock login logic (replace with actual authentication logic)
      console.log('Login successful!');
      this.onLoginSuccess(); // Call the method to handle successful login
    } else {
      this.error = 'Please fill in valid details.';
    }
  }

  onLoginSuccess() {
    // Mock user data, replace with actual user data after successful login
    const user = { name: 'Nick Doe' };

    // Store the user name in localStorage
    localStorage.setItem('userName', user.name);

    // After a successful login, redirect to the dashboard
    this.router.navigate(['/dashboard']);
  }

  closeModal() {
    this.showModal = false;
  }
}
