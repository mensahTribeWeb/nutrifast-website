import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAiSuggestionsComponent } from './meal-ai-suggestions.component';

describe('MealAiSuggestionsComponent', () => {
  let component: MealAiSuggestionsComponent;
  let fixture: ComponentFixture<MealAiSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealAiSuggestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealAiSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
