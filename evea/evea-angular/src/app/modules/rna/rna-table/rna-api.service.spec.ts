import { TestBed } from '@angular/core/testing';

import { RnaApiService } from './rna-api.service';

describe('RnaApiService', () => {
  let service: RnaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
