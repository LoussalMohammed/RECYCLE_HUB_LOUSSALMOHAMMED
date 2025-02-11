import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthErrors } from '../../modules/auth/models/auth.models';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private http = inject(HttpClient);
  private apiUrl = environments.apiUrl;

  private errorMessages: Record<string, string> = {
    required: '{field} is required.',
    email: 'Please enter a valid email address.',
  };

  getFormErrors(formGroup: FormGroup): AuthErrors {
    const errors: AuthErrors = {
      fullName: null,
      email: null,
      password: null,
      address: null,
    };

    Object.keys(errors).forEach((key) => {
      const control = formGroup.get(key);
      if (control?.errors) {
        const fieldErrors = Object.entries(control.errors).map(([errorKey, errorValue]) =>
          this.getErrorMessage(this.formatFieldName(key), errorKey, errorValue)
        );
        errors[key as keyof AuthErrors] = fieldErrors.join(' '); // Combine error messages into a single string
      }
    });

    return errors;
  }

  private getErrorMessage(field: string, errorKey: string, errorValue: any): string {
    let message = this.errorMessages[errorKey] || '{field} is invalid.';
    return message
      .replace('{field}', field)
      .replace('{requiredLength}', errorValue?.requiredLength || '');
  }

  private formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  isUniqueEmail(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map((users : User[]) => {
        return users.length === 0;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

}
