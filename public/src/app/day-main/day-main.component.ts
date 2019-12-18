import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarView, CalendarEvent, DateFormatterParams } from 'angular-calendar'

@Component({
  selector: 'app-day-main',
  templateUrl: './day-main.component.html',
  styleUrls: ['./day-main.component.scss']
})
export class DayMainComponent implements OnInit {
  
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;
  
  formattedDate: string; 

  flightFrom: string;

  flightTo?: string;

  predictList?: string[]; 
  wasClicked() { this.formattedDate = this.clickedDate.getFullYear() + "-" + this.clickedDate.getMonth() + "-" + this.clickedDate.getDate();
}

  constructor() {}
  
  ngOnInit() {}

}
