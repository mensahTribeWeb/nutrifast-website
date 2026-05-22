import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserProfile, UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup;
  profileImageUrl = 'assets/images/bg-1.png';
  imageUploadError: string | null = null;
  saveMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      userName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      height: [null, [Validators.required, Validators.min(1)]],
      weight: [null, [Validators.required, Validators.min(1)]],
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
    const profile = this.userService.getUserProfile() ?? this.userService.getDefaultProfile();
    this.profileForm.patchValue(profile);
  }

  get activeUserName(): string {
    return this.profileForm.get('userName')?.value || 'Nick Doe';
  }

  get currentWeight(): number {
    return Number(this.profileForm.get('weight')?.value) || 0;
  }

  get selectedGoal(): string {
    return this.readableValue(this.profileForm.get('goal')?.value);
  }

  get selectedFastingType(): string {
    return this.profileForm.get('fastingType')?.value || '16:8';
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !file.type.startsWith('image/')) {
      this.imageUploadError = 'Only image files are allowed.';
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      this.profileImageUrl = String(readerEvent.target?.result || this.profileImageUrl);
      this.imageUploadError = null;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.saveMessage = 'Please complete the required fields.';
      return;
    }

    const profile = this.profileForm.value as UserProfile;
    this.userService.saveUserProfile(profile);
    this.saveMessage = `${profile.userName}'s profile is updated.`;
  }

  private readableValue(value: string): string {
    const labels: Record<string, string> = {
      weightLoss: 'Weight loss',
      bulking: 'Bulking',
      maintenance: 'Maintenance',
    };

    return labels[value] || value || 'Weight loss';
  }
}
