import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLogFormComponent } from './weight-log-form.component';

describe('WeightLogFormComponent', () => {
  let component: WeightLogFormComponent;
  let fixture: ComponentFixture<WeightLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightLogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
