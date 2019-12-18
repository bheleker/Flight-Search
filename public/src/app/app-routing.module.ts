import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightPageComponent } from './flight-page/flight-page.component';
import { DayMainComponent } from './day-main/day-main.component';
import { TrendMainComponent } from './trend-main/trend-main.component';
import { PriceMainComponent } from './price-main/price-main.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'flights', component: FlightPageComponent },
  {path: 'days', component: DayMainComponent},
    {path: 'trends', component: TrendMainComponent},
    {path: 'prices', component: PriceMainComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
