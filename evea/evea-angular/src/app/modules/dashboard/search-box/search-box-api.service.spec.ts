import { TestBed } from '@angular/core/testing';

import { SearchBoxApiService } from './search-box-api.service';

describe('SearchBoxApiService', () => {
  let service: SearchBoxApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBoxApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
