import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'calendar-header',
  template: `
  <div class="monthDis">
    <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
  </div>
  <div class="buttons">
  <div class="buttons">
  <div>
          <div
            class="changeButton"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Previous
            </div>
            <div
              class="changeButton"
              mwlCalendarNextView
              [view]="view"
              [(viewDate)]="viewDate"
              (viewDateChange)="viewDateChange.next(viewDate)"
            >
              Next
            </div>
          <div
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
            >
            <button class="changeButtonLast">Today</button>
          </div>
        </div>
      </div>
    </div>
    <br />
  `
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
