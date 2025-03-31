import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrationLogFormComponent } from './hydration-log-form.component';

describe('HydrationLogFormComponent', () => {
  let component: HydrationLogFormComponent;
  let fixture: ComponentFixture<HydrationLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HydrationLogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrationLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
