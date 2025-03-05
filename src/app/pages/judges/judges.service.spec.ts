import { TestBed } from '@angular/core/testing';

import { JudgesService } from './judges.service';

describe('JudgesService', () => {
  let service: JudgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
