import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../../../shared/models';
import { CommonModule } from '@angular/common';
import { RequestUpdatePopupComponent } from '../request-update-popup/request-update-popup.component';
import { ConfirmationModalComponent } from '../../../../shared/ui/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-collection-request-item',
  standalone: true,
  imports: [CommonModule, RequestUpdatePopupComponent, ConfirmationModalComponent],
  templateUrl: './collection-request-item.component.html',
  styleUrls: ['./collection-request-item.component.css']
})
export class CollectionRequestItemComponent {
  @Input() request!: Request;
  @Output() updateRequest = new EventEmitter<Request>();
  @Output() deleteRequest = new EventEmitter<string>();

  showUpdatePopup = false;
  showDeleteConfirmation = false;

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'occupied': return 'bg-blue-200 text-blue-800';
      case 'in_progress': return 'bg-purple-200 text-purple-800';
      case 'completed': return 'bg-green-200 text-green-800';
      case 'rejected': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  }

  openUpdatePopup() {
    this.showUpdatePopup = true;
  }

  closeUpdatePopup() {
    this.showUpdatePopup = false;
  }

  onUpdateRequest(updatedRequest: Request) {
    this.updateRequest.emit(updatedRequest);
    this.closeUpdatePopup();
  }

  openDeleteConfirmation() {
    this.showDeleteConfirmation = true;
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
  }

  confirmDelete() {
    this.deleteRequest.emit(this.request.id);
    this.closeDeleteConfirmation();
  }
}