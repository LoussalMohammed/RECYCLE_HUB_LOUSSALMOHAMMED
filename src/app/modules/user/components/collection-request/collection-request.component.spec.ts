import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestComponent } from './collection-request.component';

describe('CollectionRequestComponent', () => {
  let component: CollectionRequestComponent;
  let fixture: ComponentFixture<CollectionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
