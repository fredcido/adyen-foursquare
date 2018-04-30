import { PostMessageService } from './post-message.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { AuthService } from './auth.service';

describe('AuthHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        PostMessageService,
        AuthHttpInterceptorService
      ]
    });
  });

  it('should be created', inject([AuthHttpInterceptorService], (service: AuthHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
