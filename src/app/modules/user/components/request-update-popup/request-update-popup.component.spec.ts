import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUpdatePopupComponent } from './request-update-popup.component';

describe('RequestUpdatePopupComponent', () => {
  let component: RequestUpdatePopupComponent;
  let fixture: ComponentFixture<RequestUpdatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestUpdatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestUpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
