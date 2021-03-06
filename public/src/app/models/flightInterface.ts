import {Route} from './routeInterface'

export class Flight{
    airline: string;
    availability: number;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    duration: string;
    price: number;
    departure: string;
    arrival: string;
    flightLink: string;
    flightID: string;
    routes: Route[];
}