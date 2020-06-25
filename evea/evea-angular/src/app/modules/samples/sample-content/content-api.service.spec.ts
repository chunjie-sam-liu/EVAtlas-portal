import { TestBed } from '@angular/core/testing';

import { ContentApiService } from './content-api.service';

describe('ContentApiService', () => {
  let service: ContentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
