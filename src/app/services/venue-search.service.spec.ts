import { TestBed, inject } from '@angular/core/testing';

import { VenueSearchService } from './venue-search.service';

describe('VenueSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueSearchService]
    });
  });

  it('should be created', inject([VenueSearchService], (service: VenueSearchService) => {
    expect(service).toBeTruthy();
  }));
});
