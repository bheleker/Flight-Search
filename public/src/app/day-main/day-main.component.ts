import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarView, CalendarEvent, DateFormatterParams } from 'angular-calendar'
import { FlightService } from '../flight.service';
import { Flight } from '../models/flightInterface'
import * as moment from 'moment';

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

  flightFrom: string ="SEA";

  flightTo?: string ="DFW";

  predictList?: string[]; 

  dayFlights: Flight[] = [];
  
  maxPrice: number = 600;

  wasClicked() { this.formattedDate = this.clickedDate.getDate() + "/" + this.clickedDate.getMonth() + "/" + this.clickedDate.getFullYear();
}

  constructor(private flightService: FlightService) {}
  
  getFlight(from:string = this.flightFrom, day:string = this.formattedDate, to?:string, price?:number){
    this.dayFlights = [];
    if(this.flightTo){
        to = this.flightTo
    }
    if(this.maxPrice){
        price = this.maxPrice;
    }
    console.log(price+ ' a111111111a ' + to );
    this.flightService.getFlights(from, day, to, price).subscribe(data => {
      for(let x of data['data']){
        if(Number(x['availability']['seats'])){
        let newFlight = new Flight();
        newFlight.airline = x['airlines'][0];
        newFlight.availability = Number(x['availability']['seats']);
        newFlight.flyFrom = x['flyFrom'];
        newFlight.flyTo = x['flyTo'];
        newFlight.cityFrom = x['cityFrom'];
        if(x['airlines'][0] == "DL"){
          newFlight.airline = "data:image/png;base64,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"
        }
        if(x['airlines'][0] == "AS"){
          newFlight.airline="data:image/png;base64,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";
        }
        if(x['airlines'][0] == "NK"){
          newFlight.airline="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEBAQDQ4PEBAOEA8NDw0QEA8OEBAPFhIWFhcSFRUYHiggGBolHBMVITEiJSsrLi4vFx8/ODMuNygtLisBCgoKDg0OGxAQGyslHSUtLS4rLS0tLS0tKy0rLS0tLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0tKy0tLf/AABEIALsBDQMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xABIEAACAQMAAwcNDwMFAQAAAAAAAQIDBBEFEiEGBxMxMkFRFiJUYXFyc5GSsbLR0hQVIzM1UlNVdIGCk5SzwTRCYiVjocLDF//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAwEQEAAgEBBQgBBAEFAAAAAAAAAQIDEQQSEzFRBRQhMjNBUpFxImGBscEGFTSh0f/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Xff0xc2dlRqWdaVGpK6hTlOKg24OlVbj1yfPFP7jt2HFTJkmLRr4MM95pXWHkfV/pj6xreTQ9g9XueD4uPvFzq/0x9Y1vJoewO54PinvF2Wju90u086Qrca/to+yO54Pipfacke6/q80v9YVfJo+yO54Pip3rJ1OrzS/1hV8mj7I7ng+J3nJ1bNvu30s45d/V5TXJo9C/x7ZWdkw/EnaMs+7J1a6V7Pq+TR9kd1w/FHeMvVR7tdK9n1fJpeyO6YPijvGXq37XdfpNwTd7VbedurS6X/iZ22bDr5W+PNkmusyydVukuzKvipeyR3bF8V+Lfqo91ukuzavipeyT3bF8Ti36pK33TX7hFu7qZa2vFP1GNtnxa8l4yW05r3ulv+yqnip+oju+PoniW6qPdNf9lVPFT9RPd8fQ4luqYpacu3GLdxPbGLeyHHhdownFTXk0i0q+/d32RPxQ9RHCp0TvSo9N3fZE/FD1DhU6G9KX98q/0svFH1GO5VfWVPfOv9LLxR9Q3KmsrqOkq7nFOrLDlFNdbxZXaE0jQ1l1hztAAAAAAAAAAAAAAHm+/t8n0PttP9mseh2b6s/hy7V5YeGHtuAAz2/E+6v5DO7JgKKAb1nyPxPzIpbmtDMQlRhGiSs18HH8XpMztzb4/KzYKtFGiUJa2XWQ70wtzaxyZGiErWiUJ2iush3kPRRzzzbRyVaKpUZKE2YNFCBfb8uHfx86InkO1OZqAAAAAAAAAAAAAA8339vk+3+20/2ax6HZvqz+HLtXlh4Ye24ADPb8T7q/khndkySooBvWfI/E/Milua0MzIStbCNUnZP4OP4vSZnbm3xz+lmbKtFGyUJa2fWQ70wtzaxyZGyErWyRO0ORDvIeijmnm1jkubIStYQmzFooQL6HLh38POiJ5JdqczQAAAAAAAAAAOS307idPRdedKc6c1KhicJShJZqxTw1tMc8zFJmHo9lUrfaq1tGseP9PJdzdnpnSLkrW4unGDxOrO5rQpxfRrZ2vtLPGclIyX5S+j2q+xbNH66xr00jV0tTcBp5LK0ll/N913S/5aNeDl+Tz47T2HX0/wDqHn1/eXE9elcXFWsqc2tWdadWGvFuOssvHTt7Z39jWtx5iZ9nN/qTHijY63pWI1mPbRI7ldyFzpPhfcroxVDU13VlKPL1sYxF55LPoM+01w6b3u+LxYb5OSfqb0WkUsqdnJ9HCVFnxwOf/csXSW3c8nVzd7oO4spypXdDg57JRzqyjOO1a0ZLY0dVM1cka0lz3x2pOlm7uc3P1NIVnRocFGcacqzdTMY6qlGPMnt69FM2aMVd6y2PHOSdIY9P6EnY15W9bg3OMYTbhlxxJZW1pE4ssZa70IyU3Lbstjc9o53M4UaUYa9SclHWwllQ1nl46EyuXJuRvS0w03vB1v8A82vOm07mtP2Dk7/T93R3af2RGmtyd1Zx161GDp5SdWnqzim+LOzK+9GuPaaZPCJ8VL4Zr4zDFYwjwa62P939q6WTefErEaJ7Q25qpdxlOlwKUJaj18p5wnzRfSYZM8Y50ltXHvIqvbxhKUHGOYSlB4SxmLaePEaxbWNWcw6vQ+5udahSqQVFRlF41lh7JNdHaOPJnitphvXHrGrc6kav+x/z7JTvMLcNoaU0K7bV4RUnr62NVZ4sceV2zSmXf5KzTRs0acdWPWx5MeZdCKTM6rRC/g4/Nj4kRrKVHTj82PiQ1k0dlG2p4XwcPJicustNFfctP6OHkxGsp0VVtT+jh5MRrKNGUhIAAAAAAAAAAcdvt/JNx39v+9Ax2jyS9Psf/l1/n+kFvT7oLR2SsZVlQuIyq4y1B1FOTkpwb2OSzjHH1pns943d33dXa+y5Yz8aI1r/AOIrTO99pa3cqtlfVbjjeytVo3DXlYk/v29BW2G8eNZb4O09lvEVy44j+PB5o4OOtGScXF6sotNNNPDTXMzu7F9efwz/ANUTE7HWY5aw9W3ieK/7tr/7Hp9qc6/z/h8hsPKWOG5HS70tUuKblQoO7lW4Z144lR4TONSLbeVs1Wh3jBwN2fGdOnunhZeJr7NvfkvqMlb0IyjKvCpKrNJpunTcGsS6NZ4eP8CvZ1Lazb2Rtto8I90TvPv/AFCp9kq/u0TbtD0o/LLY/U/hqb6r/wBTq+CoeiW2H0ftXa/V/iFN7b+utfC1f2JE7Z6Vltl80O+3c7nbu8q0JWrio04SjJyqOniTllPYefs2bHSJizty0taY0V3QX8bHRvua7q8Nc1bedCPHJzk01rNvmjlbXteOkjFScuberGkal7blNJ5vPrB/Bx/F52ejfm5q8no+9z8RW8N/0iebtfmh1YOThdJv4et4at6cjvp5YYW5pWyuKipQUak0lF7FOSXG+YwvWNZXrro7jdNOUbXMZNPWp7U2n40cWKP1t78nFzrSlypylji1pOWPGdkREcmOqWo8mPex8xjPNpC8gUYHbR4l3DlaqgAAAAAAAAAFG8cYFOEXSvGidJRrBwi6V40NJNYcdvtTT0TcYa5dvz/70DHPWdyfB6fZEx3uvj1/p5xua3upaQtIXFK8pQqTlUToSjraqUsJtxeU3hvi50c1dmm1dXt7V2xXBmnHNdY6vQdyGiamhaNZ6S0jTlSerwcJSkqdLGcuLnty8rYlzc504sc0jxl4m27RTa7xwqaT/bx7dVpGndXt1cUYuNOrU1oJrDaSS1mubOM/edfZPjtNp09l+26cPs2mOZ1mJeg7xTwr/u2vmrHf2nzr/P8Ah83sPKXJ7r90l/G9vKUL65jTjcVoxhCtUglFTeEsPiOvZ8GKcdZmsa6OfNlvvzES560k3rtttuSbbbbb27Wzplh4y77ef+UKn2Sr+7RPP7Q9KPy6dj9T+Gpvq/KdTwVD0S+wejH5lXa/VW72v9dbeFq/sSJ2305W2TzOr30L2tSr2zo1qlP4Kb+DqSht1+N4e049ipW1Z3odW0WmJjRM6QS0pohTwpVeC4WOMZVxT5SXRlxkvxGNNcOfT2/w0t+vH+7zmwfwcfxedno35uavJ6PvcP4Ct4b/AKRPO2vzQ6sPJw2kvj6/hq3ps7aeWGE80ja/FQ73+WZX5yvHJ3e6n+k/FTOLD529/K4k7GKao8mPex8xhPNpC5kAwO2jxI5WqoAAAAAAAAABz2+F8laQ+yV/QZts/q1/MK38svmU+l0h5ANIGShxkTEK2mYjwbCeHlbH0rYyN2Oim/bqy21tVrz1aUKlWpiUtWKlUlqpZb2bcIi25WNZ0hNZvM+Gq6x433P5ExEG9M+Ey3oUJSUnGLkqcdebSbUY5UdZ9CzJL7ykzHumNfZYWQlrHR9eNJ1ZUaipS1JRquEtRp5SetxYyY2vWZ3YnxbY6zprouDRdVpSjq60XHXipxymtaLbSkulbH4iKzHsTHVvaO5D75+ZGd+a1G3Wpyi3GacZLY4tYa7qKRMaawvJSoznrakZS1IuctVN6sVxyfQu2JmI5miVsaco046yaz1yysZi3lNdoxvOs+DSseDYp0pTerGLk3nCSyys6e6ylWDi8STTXGnsY11ErZQcoRUU28cSWecxtOkrwvaxsexrY0QKAdhY/FU/Bw9FHNPNpDOQkAAAAAAAAAAAADnt8L5K0h9kr+gzbZ/Vr+YVv5ZfMp9K8gAyUOMK35M7YZJnQGnfcUasqVFTr1JUdWpOVSMYUoS4RxWpKMsucYZ24xHGHkwzYeLMaz4NseXc5c2G4uKdW4rVKNN0oVJOoqWVLUcnlxT6Mt47WC1azWkRM6q2mJtrDdsL5UoXMHFv3TRVBNPGq+Fpzy+n4vH3lL03prPSVq20iY6tE0UdRbaeU7Z0OCxq21tbqotRTcqdSc+uklmVN63Jb2NZRyTh0vva+8z9unHl1ru/tCPyapb+kL2nVp0Vq1FUo0YUM60XTlGMpPOMZz13TzGdKTWZ6TOq1rRMQro7kPvn5kL8yqT0ndqtWqVVFxU2nqt5xsS/gypXdro0tOs6q6O0hK34Rw5U4KEX81qpCeWuddZjHbIyY9/QrbRLVL2NZQlCnwcYwjTUM62FHZsfQYbm74S13tfFksLlUpqbWViccbP7ouPPs5yLxrGiYnSWGvNOTcdifahHm6IpJfciYjSFZS+jaupGLecOLi0tV5WeJprDRjkjWV6rqsk5NxjqpttR48LoIhKwkdjYfFU/Bw9FHNPNpDOQkAAAAAAAAAAAACB3d0Z1NGX0KUJTnO1rRhCEXOUpOLwlFbWzXBMRkrM9VbcnzqtzWkfq+9/S1/ZPoePi+UfbzOHfor1NaR+r739LX9kcfF8o+4Rw7dJX0tzekM/J97+lr+yOPi+Ufatsd9OUs3U5pD6vvf01f2Rx8Xyj7Z8K/Sfo6nNIfV97+mr+yOPi+UfZwr9JZ7Xc9fpvNheLZ2NX6e9Itmx/KPs4d49p+mw9A33YN3+mreyV42P5R9m5fpP0o9A33YN5+mreyTxsXyj7RNL/ABn6bmj9B3qUs2V2tseO3rLp7RS+bH7Wj7a4aX8dYlte8t52HdfkVfUU42P5R9tty3RT3kvew7r8ir6hxcfyj7Ny3Rv6P0RdqDzaXK657HRqrmXaM75aa84XrS3RsvRV12Lcfk1PUU4lOsLbs9FvvTddi3H5NT1E8SnWDdnolNH6OuFTSdvWTzLY6U1z9wxveszzXrWdGx731/oK35c/UU369Vt2VPe+v9BW/Ln6hv16m7KUtrOrqRzSqcXzJdPcMrWjXmvEToye5Kv0VTyJEb0dU6HuSr9FU8iXqG9HU0l1dimqdNNYahBNPjT1Uc8814ZyEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=";
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        if(x['airlines'][0] == ""){
          newFlight.airline=""
        }
        newFlight.cityTo = x['cityTo'];
        let hours = Math.floor(Number(x['duration']['departure'])/3600);
        let minutes = Math.floor((x['duration']['departure']-hours*3600)/60);
        newFlight.duration = hours + ':' + minutes;
        newFlight.price = Number(x['price'])
        this.dayFlights.push(newFlight);
        }
      }
    console.log(this.dayFlights);})
    return this.dayFlights;
  }

  ngOnInit() {}

}
