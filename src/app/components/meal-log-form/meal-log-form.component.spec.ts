import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealLogFormComponent } from './meal-log-form.component';

describe('MealLogFormComponent', () => {
  let component: MealLogFormComponent;
  let fixture: ComponentFixture<MealLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealLogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
