import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoadingService {
  private subject = new Subject<boolean>();
  isLoading = false;

  constructor() {
  }

  getObservable(): Observable<boolean> {
      return this.subject.asObservable();
  }

  setLoading(flag: boolean) {
    this.isLoading = flag;
    this.subject.next(this.isLoading);
  }

  toogleLoading() {
    this.isLoading = !this.isLoading;
    this.subject.next(this.isLoading);
  }
}
