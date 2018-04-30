import { LoadingService } from './loading.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { VenueSearchService } from './venue-search.service';
import { PostMessageService } from './post-message.service';
import { AuthService } from './auth.service';

describe('VenueSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        PostMessageService,
        VenueSearchService,
        LoadingService
      ]
    });
  });

  it('should be created', inject([VenueSearchService], (service: VenueSearchService) => {
    expect(service).toBeTruthy();
  }));
});
