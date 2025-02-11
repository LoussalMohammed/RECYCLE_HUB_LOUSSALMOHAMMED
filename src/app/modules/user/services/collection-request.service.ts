import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Request, RequestStatus, User } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CollectionRequestService {
  private apiUrl = environments.apiUrl;
  private http = inject(HttpClient);

  createRequest(request: Partial<Request>): Observable<Request> {
    request = {
      ...request,
      collectionAddress : request.collectionAddress?.toLocaleLowerCase()
    }
    return this.http.post<Request>(`${this.apiUrl}/requests`, request);
  }

  getUserRequests(userId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests?userId=${userId}`);
  }

  updateRequest(request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/requests/${request.id}`, request);
  }

  deleteRequest(requestId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requests/${requestId}`);
  }

  validRequestsNumber(userId: string): Observable<boolean> {
  return this.getUserRequests(userId).pipe(
    map(requests => {
      const pendingOrRejected = requests.filter(
        request => request.status === 'pending' || request.status === 'rejected'
      );
      return pendingOrRejected.length < 3;
    })
  );
  }

  getPendingRequestsByCity(city: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests?status=pending&collectionAddress=${city}`);
}


  getCollectorRequests(collectorId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests?collectorId=${collectorId}`).pipe(
      map(requests => requests.filter(request => ['occupied', 'in_progress'].includes(request.status)))
    );
  }
  

  updateRequestStatus(requestId: string, status: RequestStatus, collectorId?: string): Observable<Request> {
    const updateData: Partial<Request> = { status, collectorId };
    return this.http.patch<Request>(`${this.apiUrl}/requests/${requestId}`, updateData);
  }

  validateRequest(requestId: string, updatedWastes: any[]): Observable<Request> {
    return this.http.patch<Request>(`${this.apiUrl}/requests/${requestId}`, {
      status: 'completed',
      wastes: updatedWastes
    });
  }

  rejectRequest(requestId: string): Observable<Request> {
    return this.http.patch<Request>(`${this.apiUrl}/requests/${requestId}`, { status: 'rejected' });
  }

  updateUserPoints(userId: string, pointsToAdd: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      map(user => ({
        ...user,
        points: (user.points || 0) + pointsToAdd
      })),
      tap(updatedUser => this.http.put(`${this.apiUrl}/users/${userId}`, updatedUser).subscribe())
    );
  }

  hasInProgressRequest(collectorId: string): Observable<boolean> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests?collectorId=${collectorId}&status=in_progress`)
      .pipe(
        map(requests => requests.length > 0)
      );
  }
}
