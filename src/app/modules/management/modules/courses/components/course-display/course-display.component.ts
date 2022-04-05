import { Location } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TuiDay, TuiTime } from "@taiga-ui/cdk";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from "date-fns";
import { map, Observable, of, Subject } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { Course } from "src/app/shared/models/course.model";

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
  selector: "app-course-display",
  templateUrl: "./course-display.component.html",
  styleUrls: ["./course-display.component.scss"],
})
export class CourseDisplayComponent implements OnInit {
  viewDate: Date = new Date();
  open = false;

  refresh = new Subject<void>();

  columns = ["groupName", "date", "startTime", "endTime", "action"];

  data: any[] = [
    {
      groupID: 1,
      color: "#ff0000",
      date: new TuiDay(2022, 3, 6),
      startTime: new TuiTime(3, 45),
      endTime: new TuiTime(4, 30),
      instructor: 1,
    },
  ];

  courseDataRequest$: Observable<Course>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private courseDAO: CoursesDaoService) {}

  toggle(open: any) {
    this.open = open;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.courseDataRequest$ = this.courseDAO.getOne({ id: val["id"] });
        this.loading$ = this.courseDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  getCourseData(id: string) {}

  goBack() {
    this.location.back();
  }

  addGroup(groupData: any) {
    this.data = [...this.data, groupData];
    this.toggle(false);
  }

  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.courseDataRequest$ = this.courseDAO.getOne({ id: this.pageID });
    }
  }
}

export interface GroupData {
  groupID: number;
  color: string;
  date: TuiDay;
  startTime: TuiTime;
  endTime: TuiTime;
  instructor: number;
}
