import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { User, Collector } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environments.apiUrl;
  private http = inject(HttpClient);

  private getEndpoint(user: User): string {
    return user.role === 'collector' ? `${this.baseUrl}/collectors` : `${this.baseUrl}/users`;
  }

  private mapCollectorData(userData: Partial<User>): any {
    if (userData.role === 'collector' && userData.fullName) {
      const [firstName, ...lastNameParts] = userData.fullName.split(' ');
      return {
        ...userData,
        firstName,
        lastName: lastNameParts.join(' '),
        // Remove fullName as it's split into firstName and lastName
        fullName: undefined
      };
    }
    return userData;
  }

  updateProfile(userId: string, userData: Partial<User>): Observable<User> {
    const endpoint = this.getEndpoint(userData as User);
    const mappedData = this.mapCollectorData(userData);
    
    if (userData.role === 'collector') {
      return this.http.patch<Collector>(`${endpoint}/${userId}`, mappedData).pipe(
        map(response => ({
          ...response,
          fullName: `${response.firstName} ${response.lastName}`,
          role: 'collector'
        }))
      );
    }
    
    return this.http.patch<User>(`${endpoint}/${userId}`, mappedData);
  }

  deleteAccount(userId: string, userRole: string): Observable<void> {
    const endpoint = userRole === 'collector' ? `${this.baseUrl}/collectors` : `${this.baseUrl}/users`;
    return this.http.delete<void>(`${endpoint}/${userId}`);
  }
}
