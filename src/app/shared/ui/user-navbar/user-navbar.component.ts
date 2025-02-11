import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models';
import { selectSignedInUser } from '../../../modules/auth/state/auth.selectors';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/service/auth.service';
import { AppState } from '../../../core/store/app.state';
import { CommonModule } from '@angular/common';
import { logout } from '../../../modules/auth/state/auth.actions';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
  imports : [CommonModule , RouterLink]
})
export class UserNavbarComponent implements OnInit {
  user$: Observable<User | null>;
  showPopup = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) {
    this.user$ = this.store.select(selectSignedInUser);
  }

  ngOnInit(): void {}

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  hidePopup() : void {
    this.showPopup = false;
  }

  logout(): void {
    this.authService.removeLoggedInUser();
    this.store.dispatch(logout())
    this.router.navigate(['/']);
  }
}