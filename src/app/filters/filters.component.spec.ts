import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FiltersComponent } from './filters.component';
import { VenueSearchService as BaseSearchService } from './../services/venue-search.service';
import { VenueSearchService } from './../services/mocks/venue-search.service';
import { LoadingService } from './../services/loading.service';
import { AuthService } from './../services/auth.service';
import { PostMessageService } from './../services/post-message.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        {provide: BaseSearchService, useClass: VenueSearchService},
        AuthService,
        LoadingService,
        PostMessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
