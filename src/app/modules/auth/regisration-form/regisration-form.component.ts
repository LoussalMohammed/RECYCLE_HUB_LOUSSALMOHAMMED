import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ValidationService } from '../../../shared/services/validation.service';
import * as authActions from "../../auth/state/auth.actions"
import { AuthErrors } from '../models/auth.models';
@Component({
  selector: 'app-regisration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './regisration-form.component.html',
  styleUrl: './regisration-form.component.css'
})
export class RegisrationFormComponent {
  authErrors = signal<AuthErrors>(
    {
      fullName : null,
      email : null ,
      password : null ,
      address : null
    }
  );
  shownSuccessMsg = signal<boolean>(false);
  registrationForm : FormGroup ;
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);


  constructor(){
    this.registrationForm = this.fb.group(
      {
        fullName : ["" , Validators.required],
        address : ["" , Validators.required],
        email : ["" , [Validators.required , Validators.email]],
        password : ["" , Validators.required]
      }
    )
  }

  handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.registrationForm.invalid) {
      let errors = this.validationService.getFormErrors(this.registrationForm);
      this.authErrors.set(errors);
    } else {
      const email = this.registrationForm.get('email')?.value;
      this.validationService.isUniqueEmail(email).subscribe((isUnique) => {
        if (!isUnique) {
          this.authErrors.set({
            email: 'Email must be unique',
            fullName : null ,
            password : null ,
            address : null
          });
        } else {
          this.store.dispatch(authActions.validForm(this.registrationForm.value));
          this.shownSuccessMsg.set(true);
          setTimeout(() => {
            this.shownSuccessMsg.set(false);
            window.location.href = "http://localhost:4200/user/requests";
          }, 3000);
          this.resetValidationErrs();
        }
      });
    }
  }

  private resetValidationErrs() : void {
    this.authErrors.set({
      fullName : null,
      email : null ,
      address : null ,
      password : null
    })
  }
}
