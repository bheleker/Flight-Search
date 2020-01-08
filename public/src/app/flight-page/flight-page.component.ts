import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Flight} from '../models/flightInterface';
@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.scss']
})
export class FlightPageComponent implements OnInit {
  @Input('flights') Flights: Flight[];
  @Output() deClick = new EventEmitter();
  
  flightSelected = false;

  selectedFlight: Flight = new Flight;

  selectFlight(flight){
    this.selectedFlight = flight;
    this.flightSelected = true;
  }
  deselectFlight(){
    this.flightSelected = false;
    this.selectedFlight = new Flight;
  }

  constructor() { }

  ngOnInit() {
  }

}
