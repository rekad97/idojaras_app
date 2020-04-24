import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {Observable, throwError, of} from 'rxjs';

let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
let cities: any[] = JSON.parse(localStorage.getItem('cities')) || [];
@Injectable()
export class Backend implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/auth') && method === 'POST':
          return auth();
        case url.endsWith('/users/register') && method === 'POST':
          return  register();
        case  url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          return next.handle(req);
      }
    }

    function auth() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Incorrect username or password!');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function register() {
      const user = body;

      if (users.find(x => x.username === user.username)) {
        return error('This username is already taken!');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauth();
      }
      return ok(users);
    }
    function deleteUser() {
      if (!isLoggedIn()) {
        return unauth();
      }
      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body}));
    }

    function error(message) {
      return throwError({ error: { message }});
    }

    function unauth() {
      return throwError({ status: 401, error: { message: 'Unauthorised'}});
      console.log(JSON.stringify(error));
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}
export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: Backend,
  multi: true
};
