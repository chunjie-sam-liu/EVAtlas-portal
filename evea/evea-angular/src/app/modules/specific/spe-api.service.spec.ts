import { TestBed } from '@angular/core/testing';

import { SpeApiService } from './spe-api.service';

describe('SpeApiService', () => {
  let service: SpeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
