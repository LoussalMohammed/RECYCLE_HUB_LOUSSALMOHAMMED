import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorRequestsComponent } from './collector-requests.component';

describe('CollectorRequestsComponent', () => {
  let component: CollectorRequestsComponent;
  let fixture: ComponentFixture<CollectorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
