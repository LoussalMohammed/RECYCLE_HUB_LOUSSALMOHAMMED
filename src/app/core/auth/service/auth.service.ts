import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegistrationData } from '../../../modules/auth/models/auth.models';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { User } from '../../../shared/models';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environments.apiUrl;
  private secretKey = environments.apiUrl;
  private readonly storageKey = 'loggedInUser';
  constructor() { }

  setLoggedInUser(user: User): void {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    localStorage.setItem(this.storageKey, ciphertext);
  }

  getLoggedInUser(): User | null {
    const ciphertext = localStorage.getItem(this.storageKey);
    if (!ciphertext) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  removeLoggedInUser(): void {
    localStorage.removeItem(this.storageKey);
  }

  register(payload : RegistrationData) : Observable<RegistrationData>{
    payload.role = "user";
    return this.http.post<RegistrationData>(`${this.apiUrl}/users` , payload);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/users?email=${email}&password=${password}`
    );
  }

}
