import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FlightService{
    constructor(private http: HttpClient) {}
    getFlights(from: string, date: string, to?: string){
        let flights = this.http.get(`https://api.skypicker.com/flights?fly_from=${from}&date_from=${date}&fly_to=${to}&partner=picky`);
        return flights;
}
}