import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler} from '@angular/common/http';

import {AuthService} from '../shared/auth_and_register/auth.service';

@Injectable()
export class Jwt_interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}
