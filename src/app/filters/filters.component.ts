import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Input() filters: any;
  selectedFilters = [];

  constructor() { }

  ngOnInit() {
  }

  toogleFilter(filter) {
    if (this.isActive(filter)) {
      this.selectedFilters = this.selectedFilters.filter(f => f.key === filter.name);
    } else {
      this.selectedFilters.push(filter);
    }
  }

  isActive(filter) {
    return this.selectedFilters.find(f => filter.key === f.key);
  }

}
