import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { daysOfWeek } from "@config/dateItems";
import { TUI_DEFAULT_MATCHER, TuiContextWithImplicit, TuiDay, TuiIdentityMatcher, tuiPure, TuiStringHandler, TuiTime } from "@taiga-ui/cdk";
import { tuiCreateTimePeriods, tuiItemsHandlersProvider } from "@taiga-ui/kit";
import { zonedTimeToUtc } from "date-fns-tz";
import { map, share, startWith, switchMap } from "rxjs";
import { CourseGroupDaoService } from "src/app/core/api/course-group-dao.service";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";
import { Employee } from "src/app/shared/models/employee.model";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent implements OnInit, AfterViewInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.courseGroupDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        day: res.day,
        startTime: new TuiTime(new Date(res.startTime).getHours(), new Date(res.startTime).getMinutes()),
        endTime: new TuiTime(new Date(res.endTime).getHours(), new Date(res.endTime).getMinutes()),
        instructorIDs: [res.instructors[0].id],
        maxNoStudents: res.maxNoStudents,
        room: res.room,
      });
    });
  }
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  courseID: string;
  @Input("courseID") set courseIdentifier(data: any) {
    this.courseID = data;
  }
  todaysDate: TuiDay = new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
  createNew = new FormGroup({
    day: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    instructorIDs: new FormControl([], Validators.required),
    maxNoStudents: new FormControl(0, Validators.required),
    room: new FormControl(null, Validators.required),
  });
  createLoading: boolean = false;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public daysOfTheWeek = daysOfWeek;
  timeItems = tuiCreateTimePeriods(8, 18);
  employeeDataRequest$ = this.employeeDAO.getAll().pipe(share());
  employeeStringify$ = this.employeeDataRequest$.pipe(
    map((items) => new Map(items.map<[string, string]>(({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`]))),
    startWith(new Map()),
    map(
      (map) => (id: string | TuiContextWithImplicit<string>) =>
        (typeof id == "string" ? map.get(id) : map.get(id.$implicit)) || "Loading..."
    )
  );
  employeeItems$ = this.employeeDataRequest$.pipe(
    map((items) => items.map(({ id }) => id)),
    startWith(null)
  );

  employeeData: Employee[];

  constructor(private courseGroupDAO: CourseGroupDaoService, private employeeDAO: EmployeeDAOService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.employeeDataRequest$.subscribe((res) => {
      this.employeeData = res;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    const startTime: TuiTime = serverData.startTime;
    const endTime: TuiTime = serverData.endTime;
    serverData.startTime = zonedTimeToUtc(new Date(new Date().setHours(startTime.hours, startTime.minutes)), this.timezone).toISOString();
    serverData.endTime = zonedTimeToUtc(new Date(new Date().setHours(endTime.hours, endTime.minutes)), this.timezone).toISOString();
    serverData.course = { id: this.courseID };
    console.log(serverData.instructorIDs);
    let instructors: Employee[] = [];
    (serverData.instructorIDs as any[]).forEach((id) => {
      let val = this.employeeData.find((employee) => employee.id === id);
      if (val) {
        instructors.push(val);
      }
    });
    serverData.instructors = instructors;
    delete serverData.instructorIDs;

    if (this.isEditMode) {
      this.courseGroupDAO.update(serverData).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    } else {
      this.courseGroupDAO.create(serverData).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    }
  }

  @tuiPure
  stringify(instructor: { id: string; name: string }[]): any {
    const map = new Map(instructor.map(({ id, name }) => [id, name] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }

  @tuiPure
  stringifyDays(instructor: { id: string; name: string }[]): any {
    const map = new Map(instructor.map(({ id, name }) => [id, name] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
  @tuiPure
  stringifyEmployees(employees: { id: string; firstName: string; lastName: string }[]): any {
    const map = new Map(employees.map(({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }

  stringifyValue(value: any): string {
    return JSON.stringify(value);
  }
}
