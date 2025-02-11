import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestItemComponent } from './collection-request-item.component';

describe('CollectionRequestItemComponent', () => {
  let component: CollectionRequestItemComponent;
  let fixture: ComponentFixture<CollectionRequestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
