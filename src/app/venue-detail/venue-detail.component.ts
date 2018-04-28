import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {

  @Input() venue: Object;

  constructor() { }

  ngOnInit() {
  }

}
