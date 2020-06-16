import { TestBed } from '@angular/core/testing';

import { SampleApiService } from './sample-api.service';

describe('SampleApiService', () => {
  let service: SampleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
