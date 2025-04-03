import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;
  profileImageUrl: string | undefined; // For storing selected image URL
  imageUploadError: string | undefined; // For image error messages
  defaultImageUrl: string =
    'https://images.pexels.com/photos/1759524/pexels-photo-1759524.jpeg?auto=compress&cs=tinysrgb&w=600'; // Unsplash default image URL
  // Default image URL

  greetingMessage: string = 'Good Morning';
  userName: string = 'John Doe';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
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
    // Load user profile here
    const profile = this.userService.getUserProfile();
    if (profile) {
      this.profileForm.patchValue(profile); // Populate the form with saved data
    }
  }

  // Handle image selection
  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result; // Set image URL to display
      };
      reader.readAsDataURL(file); // Read the file
    } else {
      this.imageUploadError = 'Only image files are allowed!';
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.saveUserProfile(this.profileForm.value);
      alert('Profile updated successfully!');
    } else {
      alert('Please fill in all required fields!');
    }
  }
}
