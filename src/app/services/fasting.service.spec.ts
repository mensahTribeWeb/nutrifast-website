import { TestBed } from '@angular/core/testing';

import { FastingService } from './fasting.service';

describe('FastingService', () => {
  let service: FastingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
