import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileSettingsComponent implements OnInit {
  profileImageUrl: string | ArrayBuffer | null = null; // Store the selected image URL
  imageUploadError: string = ''; // Store image error messages
  profileForm: FormGroup; // Reactive form group for profile data
  greetingMessage: string = 'Hello, '; // Dynamic greeting message
  userName: string = 'John Doe'; // Placeholder for user's name

  constructor(private fb: FormBuilder) {
    // Initialize the form with validators
    this.profileForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      activityLevel: ['', Validators.required],
      goal: ['', Validators.required],
      dietType: ['', Validators.required],
      allergies: [''],
      cuisinePref: [''],
      fastingType: ['', Validators.required],
      eatingStart: [''],
      eatingEnd: [''],
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  // Method to handle image selection
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result; // Store the image URL
      };
      reader.onerror = (error) => {
        this.imageUploadError = 'Error uploading image. Please try again.';
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('User Profile:', this.profileForm.value);
      // Call a service to save the profile data or process it
    } else {
      console.log('Form is invalid!');
      this.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    }
  }

  // Helper method to mark all form controls as touched
  markAllAsTouched(): void {
    Object.keys(this.profileForm.controls).forEach((key) => {
      this.profileForm.controls[key].markAsTouched();
    });
  }
}
