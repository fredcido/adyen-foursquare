import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostMessageService {
  private subject = new Subject<Object>();

  constructor() {
    window.addEventListener('message', message => this.subject.next(message.data), false);
  }

  getObservable(): Observable<any> {
      return this.subject.asObservable();
  }
}
