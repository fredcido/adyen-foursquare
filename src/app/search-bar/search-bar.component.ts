import { Component, OnInit } from '@angular/core';

import { VenueSearchService } from './../services/venue-search.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  isLogged = false;
  radius: 10;

  constructor(
    private venueSearchService: VenueSearchService,
    private authService: AuthService
  ) {
    this.isLogged = this.authService.isLogged();
    this.authService.getObservable().subscribe(logged => this.isLogged = logged);
  }

  ngOnInit() {
  }

  setRadius(radius) {
    this.venueSearchService.mergeFilters({radius});
  }

  auth() {
    this.authService.auth();
  }

  logout() {
    this.authService.logout();
  }
}
