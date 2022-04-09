import { Location } from "@angular/common";
import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TuiDay, TuiTime } from "@taiga-ui/cdk";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from "date-fns";
import { map, Observable, of, Subject } from "rxjs";
import { CourseGroupDaoService } from "src/app/core/api/course-group-dao.service";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { makeColorIterator } from "src/app/shared/functions/iterators";
import { Course } from "src/app/shared/models/course.model";
import { CourseGroup } from "src/app/shared/models/courseGroup.model";
import { Employee } from "src/app/shared/models/employee.model";

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
export class CourseDisplayComponent implements OnInit, AfterContentInit {
  viewDate: Date = new Date();
  open = false;

  refresh = new Subject<void>();

  columns = ["groupName", "day", "startTime", "endTime", "instructor", "room", "action"];

  courseGroupData: DisplayCourseGroupData[] = [];

  courseDataRequest$: Observable<Course>;
  courseGroupDataRequest$: Observable<CourseGroup[]>;
  loading$: any = of(true);
  loadingGroups: boolean = true;
  openEdit: boolean;
  pageID: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private courseDAO: CoursesDaoService,
    private courseGroupDAO: CourseGroupDaoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.courseDataRequest$ = this.courseDAO.getOne({ id: val["id"] });
        this.courseGroupDataRequest$ = this.courseGroupDAO.getAllGroupsByCourseID(val["id"]);
        this.loading$ = this.courseDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  ngAfterContentInit(): void {
    this.getCourseGroupData();
  }

  getCourseGroupData() {
    this.courseGroupData = [];
    this.courseGroupDataRequest$.subscribe((val: CourseGroup[]) => {
      let tempCourseGroupData: DisplayCourseGroupData[] = val;
      for (let i = 0; i < tempCourseGroupData.length; i++) {
        tempCourseGroupData[i].color = { primary: `hsl(${Math.random() * (359 - 0) + 0}, 83%, ${Math.random() * (60 - 40) + 40}%)` };
      }
      this.courseGroupData = tempCourseGroupData;
      this.loadingGroups = false;
    });
  }

  displayInstructors(instructors: Employee[]) {
    return instructors.map((employee) => `${employee.firstName} ${employee.lastName}`).join(", ");
  }

  deleteGroup(groupID: string) {
    this.courseGroupDAO.delete(groupID).subscribe(() => {
      this.getCourseGroupData();
    });
  }

  goBack() {
    this.location.back();
  }

  toggleGroupAdd(open: any, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.getCourseGroupData();
    }
  }
  toggleGroupEdit(open: any, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.getCourseGroupData();
    }
  }

  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.courseDataRequest$ = this.courseDAO.getOne({ id: this.pageID });
    }
  }
}

export interface DisplayCourseGroupData extends CourseGroup {
  color?: any;
}
