import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ValidationService } from '../../../shared/services/validation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthErrors } from '../models/auth.models';
import { Store } from '@ngrx/store';
import { validLoginForm } from '../state/auth.actions';
import { selectLoginErrorMsg, selectSignedInUser } from '../state/auth.selectors';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';
import { User } from '../../../shared/models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { hideAuthPopup } from '../../home/state/home.actions';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnDestroy {
  loginForm : FormGroup;
  private router = inject(Router);
  validationService = inject(ValidationService);
  private fb = inject(FormBuilder);
  signedInUser$ : Observable<User | null>;
  private store = inject(Store);
  shownLoginSuccessMsg = signal<boolean>(false);
  shownLoginFailureMsg = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  authErrors = signal<AuthErrors>(
    {
      fullName : null,
      email : null ,
      password : null , 
      address : null
    }
  );

  constructor(){
    this.loginForm = this.fb.group({
      email : ["" , [Validators.required , Validators.email]],
      password : ["" , Validators.required]
    })
    this.signedInUser$ = this.store.select(selectSignedInUser);
    this.store.select(selectLoginErrorMsg)
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMsg) => {
        this.shownLoginFailureMsg.set(Boolean(errorMsg)); 
      });
  }

  onLoginFormSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) {
      const errors = this.validationService.getFormErrors(this.loginForm);
      this.authErrors.set(errors);
      return;
    }
    this.store.dispatch(validLoginForm(this.loginForm.value));
    this.resetValidationErrs();

    this.signedInUser$.pipe(
      filter(user =>user !== null),
      take(1)
    ).subscribe(user => {   
      this.shownLoginSuccessMsg.set(true);
      setTimeout(() => {
        const redirectPath = user!.role === 'user' ? 'user/requests' : 'collector/dashboard';
        this.router.navigate([redirectPath]);
        this.store.dispatch(hideAuthPopup());
        this.shownLoginSuccessMsg.set(false);
      }, 2500);
    });
  }
  
  private resetValidationErrs() : void {
    this.authErrors.set({
      fullName : null,
      email : null , 
      address : null ,
      password : null
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
