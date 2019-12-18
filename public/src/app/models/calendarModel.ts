import {CalendarEvent} from 'angular-calendar'

export class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     */
    month(event: CalendarEvent, title: string): string {
      return event.title;
    }
  
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    monthTooltip(event: CalendarEvent, title: string): string {
      return event.title;
    }
  
    /**
     * The week view event title.
     */
    week(event: CalendarEvent, title: string): string {
      return event.title;
    }
  
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    weekTooltip(event: CalendarEvent, title: string): string {
      return event.title;
    }
  
    /**
     * The day view event title.
     */
    day(event: CalendarEvent, title: string): string {
      return event.title;
    }
  
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     */
    dayTooltip(event: CalendarEvent, title: string): string {
      return event.title;
    }
  }