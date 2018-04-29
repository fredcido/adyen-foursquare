import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { VenueSearchService } from './../services/venue-search.service';
import { GeoLocationService } from './../services/geo-location.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  filters: any = {
    radius: 10,
    near: '',
    query: ''
  };

  currentLocation: any;
  modelChanged: Subject<any> = new Subject<any>();

  constructor(
    private venueSearchService: VenueSearchService,
    private geoLocationService: GeoLocationService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.geoLocationService.getCurrentPosition().then(p => this.currentLocation = p);
    this.geoLocationService.watchPosition().subscribe(position => {
      this.currentLocation = position;
      if (!this.filters.near) {
        this.filter();
      }
    });
    this.authService.getObservable().subscribe(logged => this.filter());

    this.modelChanged
            .debounceTime(300)
            .subscribe(model => this.filter());
  }

  change() {
    this.modelChanged.next();
  }

  searchCurrentPosition() {
    this.filters.near = '';
    this.filter();
  }

  cleanQuery() {
    this.filters.query = '';
    this.filter();
  }

  filter() {
    const filters = {...this.filters};
    if (!this.filters.near) {
        filters.position = this.currentLocation;
        delete filters.near;
    }

    this.venueSearchService.setFilters(filters);
  }
}
