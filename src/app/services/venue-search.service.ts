import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { ROOT_API, CLIENT_ID, CLIENT_SECRET } from './../app.config';

const EXPLORE = 'venues/explore';
const SEARCH = 'venues/search';


@Injectable()
export class VenueSearchService {
  private subject = new Subject<Object>();
  private filters = {};
  private limit = 10;
  private offset = 0;
  private lastResponse;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  search(params = {}): Observable<any> {
    const filters = this.buildFilters(params);
    return this.http.get(`${ROOT_API}/${EXPLORE}`, {params: filters});
  }

  buildFilters(params) {
    const defaults: any = {
      v: '20180323',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      limit: this.limit,
      offset: this.offset
    };

    if (this.authService.isLogged()) {
      defaults.oauth_token = this.authService.getToken();
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

  setFilters(params = {}, placeholder = 'search') {
    this.filters[placeholder] = params;
    this.performSearch();
  }

  getFilters() {
    return Object.values(this.filters).reduce((p, v) => ({...p, ...v}), {});
  }

  mergeFilters(params = {}) {
    this.filters = {...this.filters, ...params};
    this.performSearch();
  }

  performSearch() {
    this.offset = 0;
    const params = this.getFilters();
    this.loadingService.setLoading(true);
    this.search(params).subscribe(
      res => {
        this.lastResponse = res.response;
        this.subject.next(res.response);
        this.loadingService.setLoading(false);
      },
      () => {
        this.loadingService.setLoading(false);
        this.subject.next(null);
      }
    );
  }

  next() {
    this.offset += this.limit;
    const params = this.getFilters();
    this.loadingService.setLoading(true);
    this.search(params).subscribe(res => {
      let response = res.response;
      if (this.lastResponse) {
        if (response.groups) {
          response.groups.forEach(group => {
            const originGroup = this.lastResponse.groups.find(g => group.type === g.type);
            if (originGroup) {
              originGroup.items = originGroup.items.concat(group.items);
            } else {
              this.lastResponse.groups.push(group);
            }
          });

          response = this.lastResponse;
        }
      }
      this.subject.next(response);
      this.loadingService.setLoading(false);
    });
  }
}
