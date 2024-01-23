import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripControlComponent } from './trip-control.component';

describe('TripControlComponent', () => {
  let component: TripControlComponent;
  let fixture: ComponentFixture<TripControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripControlComponent]
    });
    fixture = TestBed.createComponent(TripControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
