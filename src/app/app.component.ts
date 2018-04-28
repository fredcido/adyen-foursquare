import { Component } from '@angular/core';
import * as queryString from 'query-string';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService
  ) {
    const params = queryString.parse(location.search);
    if (params.code) {
      this.authService.setReturnCode(params.code);
    }
  }
}
