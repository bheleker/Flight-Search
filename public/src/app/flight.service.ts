import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FlightService{
    constructor(private http: HttpClient) {}
    getFlights(from: string, date: string, to?: string, price?: number){
        if(price == undefined){ price=999999};
        if(price){price = Math.round(price*.9)};
        if(to == undefined){ to=''};
        console.log(price);
        console.log(`https://api.skypicker.com/flights?fly_from=${from}&date_from=${date}&fly_to=${to}&price_to=${price}&partner=picky`);
        let flights = this.http.get(`https://api.skypicker.com/flights?fly_from=${from}&date_from=${date}&fly_to=${to}&price_to=${price}&partner=picky`);
        return flights;
}
}