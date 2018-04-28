import { Component, OnInit } from '@angular/core';

import { GeoLocationService } from './../services/geo-location.service';
import { VenueSearchService } from './../services/venue-search.service';

@Component({
  selector: 'app-venues-list',
  templateUrl: './venues-list.component.html',
  styleUrls: ['./venues-list.component.css']
})
export class VenuesListComponent implements OnInit {
  result: null;
  groups: null;

  constructor(
    private venueSearchService: VenueSearchService,
    private geoLocationService: GeoLocationService
  ) { }

  ngOnInit() {
    this.venueSearchService.getObservable().subscribe(result => {
      console.log(result);
      this.result = result;
      this.groups = result.groups;
    });

    this.geoLocationService.watchPosition().subscribe(position => {
      this.venueSearchService.mergeFilters({position});
    });
  }
}
