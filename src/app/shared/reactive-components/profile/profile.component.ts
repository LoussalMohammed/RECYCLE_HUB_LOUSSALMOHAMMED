import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectSignedInUser } from '../../../modules/auth/state/auth.selectors';
import { logout, profileUpdated } from '../../../modules/auth/state/auth.actions';
import { AuthService } from '../../../core/auth/service/auth.service';
import { ConfirmationModalComponent } from '../../ui/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, ConfirmationModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm: FormGroup;
  currentUser: User | null = null;
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private store = inject(Store);
  private router = inject(Router);

  shownSuccessMsg = signal(false);
  showDeleteModal = signal(false);

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.profileForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          password: '',
          address: user.address,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser?.id) {
      const formData = { ...this.profileForm.value };
      
      // Only include password if it was changed
      if (!formData.password) {
        delete formData.password;
      }

      // Include the role in the update data
      formData.role = this.currentUser.role;

      this.profileService.updateProfile(this.currentUser.id, formData).subscribe({
        next: (updatedUser) => {
          this.store.dispatch(profileUpdated({ user: updatedUser }));
          this.shownSuccessMsg.set(true);
          setTimeout(() => {
            this.shownSuccessMsg.set(false);
          }, 2500);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  onDeleteAccount(): void {
    if (this.currentUser?.id && this.currentUser?.role) {
      this.profileService.deleteAccount(this.currentUser.id, this.currentUser.role).subscribe({
        next: () => {
          this.authService.removeLoggedInUser();
          this.store.dispatch(logout());
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error deleting account:', error);
        }
      });
    }
  }

  confirmDeleteAccount() {
    this.onDeleteAccount();
  }

  cancelDeleteAccount() {
    this.showDeleteModal.set(false);
  }
}
