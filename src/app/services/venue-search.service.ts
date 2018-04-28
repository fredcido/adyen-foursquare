import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ROOT_API, CLIENT_ID, CLIENT_SECRET } from './../app.config';

const EXPLORE = 'venues/explore';
const SEARCH = 'venues/search';

/*
  curl -X GET -G \
  'https://api.foursquare.com/v2/venues/explore' \
    -d client_id="CLIENT_ID" \
    -d client_secret="CLIENT_SECRET" \
    -d v="20180323" \
    -d ll="40.7243,-74.0018" \
    -d query="coffee" \
    -d limit=1
*/

@Injectable()
export class VenueSearchService {
  private subject = new Subject<Object>();
  private filters = {};

  constructor(private http: HttpClient) { }

  search(params = {}): Observable<any> {
    const filters = this.buildFilters(params);
    return this.http.get(`${ROOT_API}/${EXPLORE}`, {params: filters});
  }

  buildFilters(params) {
    const defaults: any = {
        v: '20180323',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };

    if (params.position) {
      const {coords} = params.position;
      const ll = `${coords.latitude},${coords.longitude}`;
      defaults.ll = ll;
    }

    if (params.radius) {
      defaults.radius = params.radius * 1000;
    }

    return defaults;
  }

  getObservable(): Observable<any> {
      return this.subject.asObservable();
  }

  setFilters(params = {}) {
    this.filters = params;
    this.performSearch(this.filters);
  }

  mergeFilters(params = {}) {
    this.filters = {...this.filters, ...params};
    this.performSearch(this.filters);
  }

  performSearch(params) {
    this.search(params).subscribe(res => this.subject.next(res.response));
  }
}
