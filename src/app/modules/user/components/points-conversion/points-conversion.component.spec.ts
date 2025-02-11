import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsConversionComponent } from './points-conversion.component';

describe('PointsConversionComponent', () => {
  let component: PointsConversionComponent;
  let fixture: ComponentFixture<PointsConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsConversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
