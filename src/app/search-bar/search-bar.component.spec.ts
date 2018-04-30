import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';


import { SearchBarComponent } from './search-bar.component';
import { VenueSearchService as BaseSearchService } from './../services/venue-search.service';
import { VenueSearchService } from './../services/mocks/venue-search.service';
import { LoadingService } from './../services/loading.service';
import { AuthService } from './../services/auth.service';
import { PostMessageService } from './../services/post-message.service';
import { GeoLocationService } from './../services/geo-location.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [
        FormsModule,
        MatSliderModule,
        HttpClientModule,
      ],
      providers: [
        {provide: BaseSearchService, useClass: VenueSearchService},
        AuthService,
        LoadingService,
        PostMessageService,
        GeoLocationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
