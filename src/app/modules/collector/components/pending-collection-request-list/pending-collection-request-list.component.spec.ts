import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCollectionRequestListComponent } from './pending-collection-request-list.component';

describe('PendingCollectionRequestListComponent', () => {
  let component: PendingCollectionRequestListComponent;
  let fixture: ComponentFixture<PendingCollectionRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCollectionRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCollectionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
