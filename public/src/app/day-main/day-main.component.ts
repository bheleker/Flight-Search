import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarView, CalendarEvent, DateFormatterParams } from 'angular-calendar'
import { FlightService } from '../flight.service';

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

  wasClicked() { this.formattedDate = this.clickedDate.getDate() + "/" + this.clickedDate.getMonth() + "/" + this.clickedDate.getFullYear();
}

  constructor(private flightService: FlightService) {}
  
  getFlight(from:string = this.flightFrom, day:string = this.formattedDate, to?:string){
    if(this.flightTo){
        to = this.flightTo
    }
    this.flightService.getFlights(from, day, to).subscribe(data => console.log(data));
  }

  ngOnInit() {}

}
