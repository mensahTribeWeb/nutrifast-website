import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    const { email, password } = this.form.value;
    if (!email || !password) return;

    try {
      const cred = await this.auth.login(email, password);
      if (!cred.user.emailVerified) {
        this.error = 'Please verify your email before continuing.';
        await this.auth.logout();
        return;
      }
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.error = 'Invalid credentials';
    }
  }
}
