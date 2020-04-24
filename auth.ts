import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router';
import { AuthService} from './src/app/shared/auth_and_register/auth.service';

@Injectable({ providedIn: 'root' })

export class Auth implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
        return true;
      }

    this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
    return false;
    }
  }


