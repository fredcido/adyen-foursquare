import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged = false;

  constructor(
    private authService: AuthService
  ) {
    this.isLogged = this.authService.isLogged();
    this.authService.getObservable().subscribe(logged => this.isLogged = logged);
  }

  ngOnInit() {
  }

  auth() {
    this.authService.auth();
  }

  logout() {
    this.authService.logout();
  }

}
