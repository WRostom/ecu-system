import { Component, Input, OnInit } from "@angular/core";

import { Schedule } from "@config/rschedule";
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter, CalendarView } from "angular-calendar";
import { addDays, endOfDay, getDay, isSameDay, isSameMonth, startOfDay } from "date-fns";
import { Subject } from "rxjs";
import { DisplayCourseGroupData } from "src/app/modules/management/modules/courses/components/course-display/course-display.component";

import { CustomEventTitleFormatter } from "./provider/custom-title-formatter";

export enum dayOfTheWeek {
  SUNDAY = "SU",
  MONDAY = "MO",
  TUESDAY = "TU",
  WEDNESDAY = "WE",
  THURSDAY = "TH",
  FRIDAY = "FR",
  SATURDAY = "SA",
}

export enum dayOfTheWeekNumberEquivalent {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit {
  @Input("groupData") set groupData(data: DisplayCourseGroupData[]) {
    console.log(data);
    let calendarNewEvents: CalendarEvent[] = [];
    data.forEach((res) => {
      const schedule = new Schedule({
        rrules: [
          {
            frequency: "WEEKLY",
            byDayOfWeek: [dayOfTheWeek[res.day as keyof typeof dayOfTheWeek]],
            start: this.getFirstDayOfMonthThatMatchesDay(res.day),
          },
        ],
      });
      let dates = schedule
        .occurrences({ take: 15 })
        .toArray()
        .map((date) => date.toISOString());

      dates.forEach((date) => {
        calendarNewEvents.push({
          title: `Group ${res.id}`,
          start: new Date(date),
          color: res.color,
          draggable: false,
          meta: {
            startTime: res.startTime,
            endTime: res.endTime,
          },
        });
      });
    });
    this.events = calendarNewEvents;
  }
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getFirstDayOfMonthThatMatchesDay(dayOfTheWeek: string): Date {
    let initialDay = 0;
    let firstDay: Date;
    while (dayOfTheWeekNumberEquivalent[dayOfTheWeek as keyof typeof dayOfTheWeekNumberEquivalent] != getDay(firstDay)) {
      initialDay += 1;
      firstDay = addDays(this.viewDate, initialDay);
    }

    return firstDay;
  }

  stringifyDay(day: any) {
    console.log(day);
    return "Hello";
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
