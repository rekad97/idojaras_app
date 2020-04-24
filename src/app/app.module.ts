import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClient} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {appRouting} from './routing/routing';
import {Jwt_interceptor} from './interceptors/jwt_interceptor';
import {backendProvider} from './backend/backend';
import { NotificationComponent } from './notification/notification.component';
import {Error_interceptor} from './interceptors/error_interceptor';
import {WeatherService} from './shared/weather/weather.service';
import { CityComponent } from './city/city.component';

import {ContentContainerDirective } from './tab/tab_service/content-container.directive';
import { TabComponent } from './tab/tab.component';
import {TabContentComponent} from './tab/tab_service/tab-content.component';
import {TabService} from './tab/tab_service/tab.service';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    CityComponent,
    ContentContainerDirective,
    TabComponent,
    TabContentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    appRouting,
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Jwt_interceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: Error_interceptor, multi: true},
     backendProvider,
    TabService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
