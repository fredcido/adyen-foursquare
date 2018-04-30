import { Component, OnInit, ViewChild } from '@angular/core';

import { GeoLocationService } from './../services/geo-location.service';
import { VenueSearchService } from './../services/venue-search.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapCenter: any = {
    latitude: 51.444269999999996,
    longitude: 5.449800799999999
  };
  venues = [];

  constructor(
    private geoLocationService: GeoLocationService,
    private venueSearchService: VenueSearchService
  ) { }

  ngOnInit() {

    this.venueSearchService.getObservable().subscribe(result => {
      if (!result) {
        this.venues = [];
        return;
      }

      this.venues = result.groups.reduce((items, group) => items.concat(group.items), []);

      if (this.venues.length) {
        const item = this.venues[0];
        this.mapCenter.latitude = item.venue.location.lat;
        this.mapCenter.longitude = item.venue.location.lng;
      }
    });
  }
}
