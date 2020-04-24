import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {TabComponent} from '../tab/tab.component';
import {Tab} from '../tab/tab_service/tab.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  city: string;
  code: string;

  constructor(private router: Router, private tab: TabComponent) { }

  ngOnInit(): void {
  }
save() {
  let location= {
    city: this.city,
    code: this.code
  }
  localStorage.setItem('location', JSON.stringify(location));
  this.router.navigate(['/tab']);
  this.tab.addNewTab();
}
}
