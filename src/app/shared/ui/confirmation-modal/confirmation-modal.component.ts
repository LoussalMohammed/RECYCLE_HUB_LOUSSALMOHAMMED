import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input({required : true}) message: string = '';
  @Input({required : true}) actionCompletedMessage : string = "";
  shownActionCompletedMessage = signal<boolean>(false);

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.shownActionCompletedMessage.set(true);
    setTimeout(() => {
      this.shownActionCompletedMessage.set(false);
      this.confirm.emit();
    } , 2500)
  }

  onCancel() {
    
    this.cancel.emit();
  }
}