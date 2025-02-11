import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Request, WasteType, WasteItem, User } from '../../../../shared/models';
import { Store } from '@ngrx/store';
import { selectSignedInUser } from '../../../auth/state/auth.selectors';
import { TitleComponent } from "../../../../shared/ui/title/title.component";

@Component({
  selector: 'app-request-update-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TitleComponent],
  templateUrl: './request-update-popup.component.html',
  styleUrls: ['./request-update-popup.component.css']
})
export class RequestUpdatePopupComponent implements OnInit {
  @Input() request!: Request;
  @Output() updateRequest = new EventEmitter<Request>();
  @Output() closePopup = new EventEmitter<void>();
  requestForm: FormGroup;
  wasteTypes: WasteType[] = ['plastic', 'glass', 'paper', 'metal'];
  totalWeight: number = 0;
  totalPoints: number = 0;
  showDeleteConfirmation: boolean = false;
  shownErrorMsg = signal<boolean>(false);
  errorMsg: string = "";
  shownSuccessMsg = signal<boolean>(false);
  currentUser: User | null = null;

  private fb = inject(FormBuilder);
  private store = inject(Store);

  constructor() {
    this.requestForm = this.fb.group({
      wastes: this.fb.array([]),
      collectionAddress: ['', Validators.required],
      collectionDateTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.select(selectSignedInUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.initForm();
    this.calculateTotalWeight();
    this.calculatePoints();
  }

  get wastes() {
    return this.requestForm.get('wastes') as FormArray;
  }

  initForm() {
    this.requestForm.patchValue({
      collectionAddress: this.request.collectionAddress,
      collectionDateTime: this.request.collectionDateTime
    });

    this.wasteTypes.forEach(type => {
      const existingWaste = this.request.wastes.find(w => w.type === type);
      this.wastes.push(this.fb.group({
        type: type,
        weight: [existingWaste ? existingWaste.weight : 0, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  calculateTotalWeight() {
    this.totalWeight = this.wastes.controls.reduce((total, control) => {
      return total + control.get('weight')?.value;
    }, 0);
  }

  calculatePoints() {
    this.totalPoints = this.wastes.controls.reduce((total, control) => {
      const type = control.get('type')?.value;
      const weight = control.get('weight')?.value;
      switch (type) {
        case 'plastic': return total + weight * 2;
        case 'glass': return total + weight * 1;
        case 'paper': return total + weight * 1;
        case 'metal': return total + weight * 5;
        default: return total;
      }
    }, 0);
  }

  validateDateTime(): boolean {
    const collectionDateTime = new Date(this.requestForm.get('collectionDateTime')?.value);
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    tomorrow.setHours(0, 0, 0, 0);

    const isAfterTomorrow = collectionDateTime >= tomorrow;
    const hours = collectionDateTime.getHours();
    const isWithinTime = hours >= 9 && hours <= 18;

    if (!isAfterTomorrow) {
      this.errorMsg = "Collection date must be starting from tomorrow.";
      return false;
    }
    if (!isWithinTime) {
      this.errorMsg = "Collection time must be between 9 AM and 6 PM.";
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.requestForm.valid && this.currentUser) {
      if (this.totalWeight >= 1 && this.totalWeight <= 10) {
        if (!this.validateDateTime()) {
          this.showErrorMessage("Collection date must start from tomorrow , between 9 AM and 6 PM.");
          return;
        }
      
        const wasteItems: WasteItem[] = this.wastes.value.filter((waste: WasteItem) => waste.weight > 0);
        const updatedRequest: Request = {
          ...this.request,
          wastes: wasteItems,
          collectionAddress: this.requestForm.get('collectionAddress')?.value,
          collectionDateTime: this.requestForm.get('collectionDateTime')?.value,
          points: this.totalPoints
        };
        this.shownSuccessMsg.set(true);
        setTimeout(() => {
          this.shownSuccessMsg.set(false);
          this.updateRequest.emit(updatedRequest);  
        }, 2500);
      } else {
        this.showErrorMessage("Overall weight must be between 1 and 10.");
      }
    }
  }

  showErrorMessage(message: string): void {
    this.errorMsg = message;
    this.shownErrorMsg.set(true);
    setTimeout(() => {
      this.shownErrorMsg.set(false);
      this.errorMsg = "";
    }, 3500);
  }



  close() {
    this.closePopup.emit();
  }
}