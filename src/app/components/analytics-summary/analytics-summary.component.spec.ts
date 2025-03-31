import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSummaryComponent } from './analytics-summary.component';

describe('AnalyticsSummaryComponent', () => {
  let component: AnalyticsSummaryComponent;
  let fixture: ComponentFixture<AnalyticsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
