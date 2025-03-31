import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastingTrackerComponent } from './fasting-tracker.component';

describe('FastingTrackerComponent', () => {
  let component: FastingTrackerComponent;
  let fixture: ComponentFixture<FastingTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastingTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastingTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
