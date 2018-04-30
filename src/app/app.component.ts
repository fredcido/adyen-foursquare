import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as queryString from 'query-string';

import { AuthService } from './services/auth.service';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  disclaimerKey = 'disclaimer';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    const params = queryString.parse(location.search);
    if (params.code) {
      this.authService.setReturnCode(params.code);
    }
  }

  ngOnInit() {
    const disclaimer = localStorage.getItem(this.disclaimerKey);
    if (!disclaimer) {
      const dialogRef = this.dialog.open(DisclaimerComponent);

      dialogRef.afterClosed().subscribe(result => {
          localStorage.setItem(this.disclaimerKey, 'true');
      });
    }
  }
}
