import { Component, OnInit } from '@angular/core';
import {TabService} from './tab_service/tab.service';
import {Tab} from './tab_service/tab.model';
import {HomepageComponent} from '../homepage/homepage.component';
import {WeatherService} from '../shared/weather/weather.service';
import {ForecastService} from '../shared/weather/forecast.service';
import {CityComponent} from '../city/city.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  tabs = new Array<Tab>();
  selectedTab: number;

  constructor(private tabService: TabService) {
    this.addNewCity();
  }

  ngOnInit() {
    this.tabService.tabSub.subscribe(tabs => {
      this.tabs = tabs;
      this.selectedTab = tabs.findIndex(tab => tab.active);
    });
  }

  tabChanged(event) {
    console.log('tab changed');
  }

  addNewCity(){
    this.tabService.addTab(
      new Tab(CityComponent, 'Add new city', {parent: 'AppComponent'})
    );
  }
  addNewTab() {

    this.tabService.addTab(
      new Tab(HomepageComponent, 'City', { parent: 'AppComponent' })
    );
  }

  removeTab(index: number): void {
    this.tabService.removeTab(index);
  }
}
