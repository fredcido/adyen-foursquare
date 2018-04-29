import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { ROOT_API, CLIENT_ID, CLIENT_SECRET } from './../app.config';

const EXPLORE = 'venues/explore';
const SEARCH = 'venues/search';


@Injectable()
export class VenueSearchService {
  private subject = new Subject<Object>();
  private filters = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  search(params = {}): Observable<any> {
    const filters = this.buildFilters(params);
    return this.http.get(`${ROOT_API}/${EXPLORE}`, {params: filters});
  }

  buildFilters(params) {
    const defaults: any = {
        v: '20180323'
    };

    if (this.authService.isLogged()) {
      defaults.oauth_token = this.authService.getToken();
    } else {
      defaults.client_id = CLIENT_ID;
      defaults.client_secret = CLIENT_SECRET;
    }

    if (params.position) {
      const {coords} = params.position;
      const ll = `${coords.latitude},${coords.longitude}`;
      defaults.ll = ll;

      delete params.position;
    }

    if (params.radius) {
      defaults.radius = params.radius * 1000;
      delete params.radius;
    }

    return {...defaults, ...params};
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
