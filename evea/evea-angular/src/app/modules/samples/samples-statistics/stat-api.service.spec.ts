import { TestBed } from '@angular/core/testing';

import { StatApiService } from './stat-api.service';

describe('StatApiService', () => {
  let service: StatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
