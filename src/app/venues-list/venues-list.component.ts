import { Component, OnInit } from '@angular/core';

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
    private venueSearchService: VenueSearchService
  ) { }

  ngOnInit() {
    this.venueSearchService.getObservable().subscribe(result => {
      this.result = result;
      this.groups = result.groups;
    });
  }
}
