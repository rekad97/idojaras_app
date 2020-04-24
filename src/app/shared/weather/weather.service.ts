import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class WeatherService {
  apiKey = 'ed32502c193968e9eda30d886d00eede';
  url;


  constructor(private http: HttpClient) {
    this.url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=` ;
    // this.urlForecast = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}`;
  }
  getWeather(city, code) {
     return this.http.get(`${this.url}${city},${code}`);
  }

}
