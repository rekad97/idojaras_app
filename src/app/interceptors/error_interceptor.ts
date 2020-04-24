import { Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../shared/auth_and_register/auth.service';

@Injectable()
// tslint:disable-next-line:class-name
export class Error_interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(req).pipe(catchError(err => {
     if (err.status === 401) {
       this.authService.logout();
       location.reload(true);
     }
     const error = err.error.message || err.statusText;
     return throwError(error);
   }));
  }
}
