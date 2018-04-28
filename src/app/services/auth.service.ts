import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ROOT_API, CLIENT_ID, CLIENT_SECRET } from './../app.config';
import { PostMessageService } from './post-message.service';

const AUTH_URL = 'https://foursquare.com/oauth2/authenticate';

@Injectable()
export class AuthService {
  private subject = new Subject<Object>();
  protected token;
  protected popup;
  tokenKey = 'token';

  constructor(
    private postMessageService: PostMessageService
  ) {
    this.token = localStorage.getItem(this.tokenKey);

    this.postMessageService.getObservable().subscribe(
        message => {
          if (message.token) {
            this.setToken(message.token);
          }
        }
    );
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
    this.token = token;
    this.subject.next(this.token);
  }

  isLogged(): boolean {
    return !!this.token;
  }

  getObservable(): Observable<any> {
      return this.subject.asObservable();
  }

  auth() {
    const width = 1000;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    const redirect_uri = location.href;
    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}`;
    const params = `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`;
    this.popup = window.open(url, 'Adyen Foursquare - OAuth', params);

    if (this.popup.focus) {
      this.popup.focus();
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem(this.tokenKey);

    this.subject.next(false);
  }

  setReturnCode(token) {
    if (window.opener) {
      window.opener.postMessage({token}, '*');
      window.close();
    } else {
      this.setToken(token);
    }
  }

}
