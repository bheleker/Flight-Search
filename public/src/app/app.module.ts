import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PriceMainComponent } from './price-main/price-main.component';
import { TrendMainComponent } from './trend-main/trend-main.component';
import { DayMainComponent } from './day-main/day-main.component';
import { PricePageComponent } from './price-page/price-page.component';
import { TrendPageComponent } from './trend-page/trend-page.component';
import { DayPageComponent } from './day-page/day-page.component';
import { FlightPageComponent } from './flight-page/flight-page.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter, CalendarNativeDateFormatter, DateFormatterParams, CalendarDateFormatter, CalendarEventTitleFormatter} from 'angular-calendar';
import { adapterFactory } from '../../node_modules/angular-calendar/date-adapters/date-fns/index.js';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-utils/calendar-header.component';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public monthViewColumnHeader({date, locale="en"}: DateFormatterParams): string{
      return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date).substr(0, 1);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PriceMainComponent,
    TrendMainComponent,
    DayMainComponent,
    PricePageComponent,
    TrendPageComponent,
    DayPageComponent,
    FlightPageComponent,
    CalendarHeaderComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory:adapterFactory
    }),

  ],
  providers: [CalendarEventTitleFormatter,
  {
    provide: CalendarDateFormatter, useClass: CustomDateFormatter
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
