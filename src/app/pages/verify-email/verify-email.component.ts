import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  message: string | null = null;

  constructor(private auth: Auth) {}

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        this.message = 'Verification email sent! Please check your inbox.';
      } catch (error: any) {
        this.message = 'Failed to send verification email.';
      }
    } else {
      this.message = 'Email already verified or user not logged in.';
    }
  }
}
