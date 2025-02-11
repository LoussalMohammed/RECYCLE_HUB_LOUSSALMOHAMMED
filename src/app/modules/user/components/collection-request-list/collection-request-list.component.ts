import { Component, inject } from '@angular/core';
import { Request, User } from '../../../../shared/models';
import { CollectionRequestService } from '../../services/collection-request.service';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { CommonModule } from '@angular/common';
import { CollectionRequestItemComponent } from "../collection-request-item/collection-request-item.component";
import { TitleComponent } from "../../../../shared/ui/title/title.component";

@Component({
  selector: 'app-collection-request-list',
  imports: [CommonModule, CollectionRequestItemComponent, TitleComponent],
  templateUrl: './collection-request-list.component.html',
  styleUrl: './collection-request-list.component.css'
})
export class CollectionRequestListComponent {
  requests: Request[] = [];
  currentUser: User | null = null;
  private collectionRequestService = inject(CollectionRequestService);
  private store = inject(Store);

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadUserRequests();
      }
    });
  }

  loadUserRequests() {
    if (this.currentUser) {
      this.collectionRequestService.getUserRequests(this.currentUser.id!).subscribe({
        next: (requests) => {
          this.requests = requests;
        },
        error: (error) => console.error('Error loading requests:', error)
      });
    }
  }

  updateRequest(updatedRequest: Request) {
    this.collectionRequestService.updateRequest(updatedRequest).subscribe({
      next: (request) => {
        const index = this.requests.findIndex(r => r.id === request.id);
        if (index !== -1) {
          this.requests[index] = request;
        }
      },
      error: (error) => console.error('Error updating request:', error)
    });
  }

  deleteRequest(requestId: string) {
    this.collectionRequestService.deleteRequest(requestId).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.id !== requestId);
      },
      error: (error) => console.error('Error deleting request:', error)
    });
  }
}
