import { Component } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './shared/auth_and_register/auth.service';
import { User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'idojaras';
  currentUser: User;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  home(){
    this.router.navigate(['/tab']);
  }
}
