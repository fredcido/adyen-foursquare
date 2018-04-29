import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { VenueSearchService } from './../services/venue-search.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() result: any;
  filters = [];
  selectedFilters = [];

  constructor(
    private venueSearchService: VenueSearchService,
  ) { }

  ngOnInit() {
  }

  toogleFilter(filter) {
    if (this.isActive(filter)) {
      this.selectedFilters = this.selectedFilters.filter(f => f.key === filter.name);
    } else {
      this.selectedFilters.push(filter);
    }

    const filters = this.selectedFilters.reduce((placeholder, f) => ( {...placeholder, ...{[f.key]: 1}} ), {});
    this.venueSearchService.setFilters(filters, 'filters');
  }

  isActive(filter) {
    return this.selectedFilters.find(f => filter.key === f.key);
  }

  ngOnChanges() {
    if (this.selectedFilters.length) {
      this.filters = this.selectedFilters;
    } else if (this.result.suggestedFilters) {
      this.filters = this.result.suggestedFilters.filters;
    }
  }
}
