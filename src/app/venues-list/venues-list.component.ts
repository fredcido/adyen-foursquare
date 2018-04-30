import { Component, OnInit } from '@angular/core';

import { VenueSearchService } from './../services/venue-search.service';
import { LoadingService } from './../services/loading.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-venues-list',
  templateUrl: './venues-list.component.html',
  styleUrls: ['./venues-list.component.css']
})
export class VenuesListComponent implements OnInit {
  result = null;
  groups = [];
  isLogged = false;
  isLoading = false;
  totalResults = 0;

  constructor(
    private venueSearchService: VenueSearchService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.venueSearchService.getObservable().subscribe(result => {
      this.result = result;
      if (null !== this.result) {
        this.groups = result.groups;
        this.totalResults = this.groups.reduce((total, item) => total + item.items.length, 0);
      }
    }, () => this.result = null);

    this.authService.getObservable().subscribe(logged => this.isLogged = logged);
    this.loadingService.getObservable().subscribe(loading => this.isLoading = loading);
  }

  moreResults() {
    this.venueSearchService.next();
  }
}
