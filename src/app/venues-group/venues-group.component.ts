import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-venues-group',
  templateUrl: './venues-group.component.html',
  styleUrls: ['./venues-group.component.css']
})
export class VenuesGroupComponent implements OnInit {

  @Input() group: Object;

  constructor() { }

  ngOnInit() {
  }

}
