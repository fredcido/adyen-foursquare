import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare const navigator: any;

@Injectable()
export class GeoLocationService {
  private subject = new Subject<Object>();
  private isTracking = false;

  constructor() { }

  isSupported(): boolean {
    return !!navigator.geolocation;
  }

  getCurrentPosition(): Promise<Object> {
      return new Promise<Object>((resolve, reject) => {
          if (this.isSupported()) {
            navigator.geolocation.getCurrentPosition(position => resolve(position));
          } else {
            reject('Geolocation not supported');
          }
      });
  }

  watchPosition(): Observable<any> {
    if (!this.isTracking && this.isSupported()) {
      navigator.geolocation.watchPosition(position => this.subject.next(position));
      this.isTracking = true;
    }

    return this.subject.asObservable();
  }
}
