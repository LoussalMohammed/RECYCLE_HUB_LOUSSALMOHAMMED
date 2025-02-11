// src/app/modules/user/components/points-conversion/points-conversion.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { User, VoucherOption } from '../../../../shared/models';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { ProfileService } from '../../../../shared/services/profile.service';
import { profileUpdated } from '../../../auth/state/auth.actions';
import { TitleComponent } from "../../../../shared/ui/title/title.component";


@Component({
  selector: 'app-points-conversion',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './points-conversion.component.html',
  styleUrls: ['./points-conversion.component.css']
})
export class PointsConversionComponent implements OnInit {
  user$: Observable<User | null>;
  voucherOptions: VoucherOption[] = [
    { points: 100, amount: 50 },
    { points: 200, amount: 120 },
    { points: 500, amount: 350 }
  ];
  shownSuccessMsg = signal<boolean>(false);
  shownFailureMsg = signal<boolean>(false);
  private profileService = inject(ProfileService);
  private store = inject(Store);

  constructor() {
    this.user$ = this.store.select(selectSignedInUser);
  }

  ngOnInit() {}

  convertPoints(option: VoucherOption) {
    this.user$.pipe(first()).subscribe(user => {
      if (user && user.points && user.points >= option.points) {
        const updatedUser: User = {
          ...user,
          points: user.points - option.points,
          balance: (user.balance || 0) + option.amount
        };
  
        if (updatedUser.id) {
          this.profileService.updateProfile(updatedUser.id, updatedUser).subscribe({
            next: () => {
              this.store.dispatch(profileUpdated({ user: updatedUser }));
              this.shownSuccessMsg.set(true);
              setTimeout(() => {
                this.shownSuccessMsg.set(false);
              }, 2500);
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      } else {
        this.shownFailureMsg.set(true);
        setTimeout(() => {
          this.shownFailureMsg.set(false);
        }, 2500);
      }
    });
  }
}