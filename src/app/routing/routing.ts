import {RouterModule, Routes} from '@angular/router';

import {Auth} from '../../../auth';
import {HomepageComponent} from '../homepage/homepage.component';
import {RegisterComponent} from '../register/register.component';
import { LoginComponent} from '../login/login.component';
import {CityComponent} from '../city/city.component';
import {TabComponent} from '../tab/tab.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent, canActivate: [Auth]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: '', component: LoginComponent},
  {path: 'new_city', component: CityComponent},
  {path: 'tab', component: TabComponent},
  {path: '**', redirectTo: ''}
];

export const appRouting = RouterModule.forRoot(routes);
