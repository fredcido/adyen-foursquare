import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MAPS_KEY } from '../app.config';
import { VenueSearchService as BaseSearchService } from './../services/venue-search.service';
import { VenueSearchService } from './../services/mocks/venue-search.service';
import { LoadingService } from './../services/loading.service';
import { AuthService } from './../services/auth.service';
import { PostMessageService } from './../services/post-message.service';


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: MAPS_KEY
        }),
        HttpClientModule
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
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
