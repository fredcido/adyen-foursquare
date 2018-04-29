import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loadingService.getObservable().subscribe(flag => this.isLoading = flag);
  }

  ngOnInit() {
  }

}
