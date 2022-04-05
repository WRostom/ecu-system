import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { TuiDay } from "@taiga-ui/cdk";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from "date-fns";
import { Subject } from "rxjs";
import { GroupData } from "src/app/modules/management/modules/courses/components/course-display/course-display.component";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  @Input("groupData") set groupData(data: GroupData[]) {
    console.log(data);
    console.log(new TuiDay(2022, 3, 4).toUtcNativeDate());

    let calendarNewEvents: CalendarEvent[] = data.map((res) => {
      let concatInitalDateTime: [number, number, number, number, number] = [
        res.date.year,
        res.date.month,
        res.date.day,
        res.startTime.hours,
        res.startTime.minutes,
      ];
      let concatEndDateTime: [number, number, number, number, number] = [
        res.date.year,
        res.date.month,
        res.date.day,
        res.endTime.hours,
        res.endTime.minutes,
      ];

      console.log(new Date(...concatInitalDateTime));

      return {
        title: `Group ${res.groupID}`,
        start: new Date(...concatInitalDateTime),
        end: new Date(...concatEndDateTime),
        color: colors[Object.keys(colors)[Math.random() * 3]],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      };
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

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: "A draggable and resizable event",
    //   color: colors.yellow,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

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

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: "New event",
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
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
