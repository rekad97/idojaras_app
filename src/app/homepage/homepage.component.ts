import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { first} from 'rxjs/operators';
import {Chart} from 'chart.js';


import {User} from '../models/user';
import { UserService } from '../shared/auth_and_register/user.service';
import {AuthService} from '../shared/auth_and_register/auth.service';
import {WeatherService} from '../shared/weather/weather.service';
import {ForecastService} from '../shared/weather/forecast.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [WeatherService, ForecastService]
})
export class HomepageComponent implements OnInit, AfterViewInit{

  @ViewChild('chart', {static: true}) chartRef;
  chart: [];
  ctx: any;
location = {
  city: 'London',
  code: 'Uk'
};

  key = 'list';
  value: any;
 @Input() weather: any;
  currentUser: User;
  users = [];
  cities = [];
  constructor(private authService: AuthService, private userService: UserService, private weatherService: WeatherService, private forecastService: ForecastService) {
    this.currentUser = this.authService.currentUserValue;
  }


  ngOnInit(): void {
    this.value = localStorage.getItem('location');
    if (this.value == null) {
      this.location = {
        city: 'London',
        code: 'Uk'
      };
    } else {
      this.location = JSON.parse(this.value);
    }
    this.weatherService.getWeather(this.location.city, this.location.code).subscribe(res => {
     console.log(res);
     this.weather = res;
   });
   this.loadAllUsers();
  }


  ngAfterViewInit(): void {
    console.log(this.chartRef.nativeElement);
    this.chartit();
  }

  chartit() {
  this.forecastService.forecast(this.location.city, this.location.code).subscribe(res => {
    console.log(res);

    let htmlRef = this.chartRef.nativeElement;
    console.log(htmlRef);
    let temp_max = res[this.key].map(res => res.main.temp_max);
    console.log(temp_max);
    let temp_min = res[this.key].map(res => res.main.temp_min);
    console.log(temp_min);
    let allDates = res[this.key].map(res => res.dt);
    console.log(allDates);

    let Dates = [];
    allDates.forEach((res) => {
      let date = new Date(res *1000);
      Dates.push(date.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
    })
    console.log(Dates);

    this.chart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: Dates,
        datasets: [
          {
            data: temp_max,
            borderColor: '#3cbe0f',
            fill: false
          },
          {
            data: temp_min,
            borderColor: '#33ff88',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }, err => {
    console.log(err);
  });

}
  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }


}
