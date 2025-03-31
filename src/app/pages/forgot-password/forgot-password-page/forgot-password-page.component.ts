import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  imports: [CommonModule],
})
export class ForgotPasswordPageComponent {
  form: any;

  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async submit() {
    const email = this.form.value.email;
    if (!email) return;

    try {
      await sendPasswordResetEmail(this.auth, email);
      this.message = 'Password reset email sent! Please check your inbox.';
      this.error = null;
    } catch (err: any) {
      this.error = err.message;
      this.message = null;
    }
  }
}
