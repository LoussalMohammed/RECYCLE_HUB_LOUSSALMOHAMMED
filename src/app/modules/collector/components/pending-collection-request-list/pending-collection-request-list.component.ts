import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Request, User } from '../../../../shared/models';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { CollectionRequestService } from '../../../user/services/collection-request.service';
import { TitleComponent } from "../../../../shared/ui/title/title.component";

@Component({
  selector: 'app-pending-collection-request-list',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './pending-collection-request-list.component.html',
  styleUrls: ['./pending-collection-request-list.component.css']
})
export class PendingCollectionRequestListComponent implements OnInit {
  pendingRequests: Request[] = [];
  currentUser: User | null = null;
  private collectionRequestService = inject(CollectionRequestService);
  private store = inject(Store);
  shownSuccessMsg = signal(false);

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user && user.role === 'collector') {
        this.currentUser = user;
        this.loadPendingRequests(user.address.trim());
      }
    });
  }

  loadPendingRequests(city: string) {
    this.collectionRequestService.getPendingRequestsByCity(city.toLowerCase()).subscribe({
      next: (requests) => {
        this.pendingRequests = requests;
      },
      error: (error) => console.error('Error loading pending requests:', error)
    });
  }

  markAsOccupied(request: Request) {
    if (this.currentUser) {
      this.collectionRequestService.updateRequestStatus(request.id, 'occupied', this.currentUser.id).subscribe({
        next: (updatedRequest) => {
          this.pendingRequests = this.pendingRequests.filter(r => r.id !== updatedRequest.id);
          this.shownSuccessMsg.set(true);
          setTimeout(() => {
            this.shownSuccessMsg.set(false);
          } , 2500)
        },
        error: (error) => console.error('Error marking request as occupied:', error)
      });
    }
  }

}