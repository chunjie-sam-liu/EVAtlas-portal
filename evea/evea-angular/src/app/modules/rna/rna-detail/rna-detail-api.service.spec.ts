import { TestBed } from '@angular/core/testing';

import { RnaDetailApiService } from './rna-detail-api.service';

describe('RnaDetailApiService', () => {
  let service: RnaDetailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnaDetailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
