import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { VenuesListComponent } from './venues-list/venues-list.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenuesGroupComponent } from './venues-group/venues-group.component';

import { AuthService } from './services/auth.service';
import { GeoLocationService } from './services/geo-location.service';
import { VenueSearchService } from './services/venue-search.service';
import { PostMessageService } from './services/post-message.service';
import { FiltersComponent } from './filters/filters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';

import { MAPS_KEY } from './app.config';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    VenuesListComponent,
    VenueDetailComponent,
    VenuesGroupComponent,
    FiltersComponent,
    NavbarComponent,
    MapComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AgmCoreModule.forRoot({
      apiKey: MAPS_KEY
    })
  ],
  providers: [
    VenueSearchService,
    GeoLocationService,
    PostMessageService,
    AuthService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
