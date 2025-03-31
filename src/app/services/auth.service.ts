import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  user$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth) {
    // Initialize the observer to keep track of user state
    onAuthStateChanged(this.auth, (user) => this.currentUserSubject.next(user));
  }

  // Login method using email and password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Signup method that also sends a verification email
  async signup(email: string, password: string) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await sendEmailVerification(cred.user); // Send verification email after signup
      return cred;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error; // Propagate error to be handled by the component
    }
  }

  // Logout method
  logout() {
    return signOut(this.auth);
  }

  // Getter for the current authenticated user
  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
