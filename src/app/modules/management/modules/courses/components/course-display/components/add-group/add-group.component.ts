import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { daysOfWeek } from "@config/dateItems";
import { TUI_DEFAULT_MATCHER, TuiContextWithImplicit, TuiDay, TuiIdentityMatcher, tuiPure, TuiStringHandler, TuiTime } from "@taiga-ui/cdk";
import { tuiCreateTimePeriods, tuiItemsHandlersProvider } from "@taiga-ui/kit";
import { zonedTimeToUtc } from "date-fns-tz";
import { map, Observable, share, startWith, switchMap } from "rxjs";
import { CourseGroupDaoService } from "src/app/core/api/course-group-dao.service";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";
import { Employee } from "src/app/shared/models/employee.model";
import { personType } from "src/app/shared/models/person.model";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent implements OnInit, AfterViewInit {
  isEditMode: boolean = false;
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  courseID: string;
  facultyID: string;
  courseGroupID: string;

  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.courseGroupID = data;
    this.courseGroupDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        name: res.name,
        doctors: res.instructors.filter((instructor) => instructor.type === personType.DOCTOR).map((employee) => employee.id),
        teachingAssistants: res.instructors
          .filter((instructor) => instructor.type === personType.TEACHER_ASSISTANT)
          .map((employee) => employee.id),
        maxNoStudents: res.maxNoStudents,
        currentNumberStudents: res.currentNumberStudents,
      });
      console.log(this.createNew.value, "values");
    });
  }

  @Input("facultyId") set facultyIdentifier(data: any) {
    this.facultyID = data;
  }
  @Input("courseID") set courseIdentifier(data: any) {
    this.courseID = data;
  }
  todaysDate: TuiDay = new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
  createNew = new FormGroup({
    name: new FormControl(null, Validators.required),
    doctors: new FormControl([], Validators.required),
    teachingAssistants: new FormControl([], Validators.required),
    maxNoStudents: new FormControl(0, Validators.required),
    currentNumberStudents: new FormControl(0, Validators.required),
  });
  createLoading: boolean = false;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public daysOfTheWeek = daysOfWeek;
  timeItems = tuiCreateTimePeriods(8, 18);
  doctorDataRequest$: Observable<Employee[]>;
  doctorStringify$: any;
  doctorItems$: Observable<string[]>;
  teachingAssistantDataRequest$: Observable<Employee[]>;
  teachingAssistantStringify$: any;
  teachingAssitantItems$: Observable<string[]>;

  doctorData: Employee[];
  teachingAssistantsData: Employee[];

  constructor(private courseGroupDAO: CourseGroupDaoService, private employeeDAO: EmployeeDAOService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.doctorDataRequest$ = this.employeeDAO.getEmpBasedTypeAndFaculty(this.facultyID, personType.DOCTOR).pipe(share());
    this.teachingAssistantDataRequest$ = this.employeeDAO
      .getEmpBasedTypeAndFaculty(this.facultyID, personType.TEACHER_ASSISTANT)
      .pipe(share());

    this.doctorStringify$ = this.doctorDataRequest$.pipe(
      map((items) => new Map(items.map<[string, string]>(({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`]))),
      startWith(new Map()),
      map(
        (map) => (id: string | TuiContextWithImplicit<string>) =>
          (typeof id == "string" ? map.get(id) : map.get(id.$implicit)) || "Loading..."
      )
    );

    this.teachingAssistantStringify$ = this.teachingAssistantDataRequest$.pipe(
      map((items) => new Map(items.map<[string, string]>(({ id, firstName, lastName }) => [id, `${firstName} ${lastName}`]))),
      startWith(new Map()),
      map(
        (map) => (id: string | TuiContextWithImplicit<string>) =>
          (typeof id == "string" ? map.get(id) : map.get(id.$implicit)) || "Loading..."
      )
    );

    this.doctorItems$ = this.doctorDataRequest$.pipe(
      map((items) => items.map(({ id }) => id)),
      startWith(null)
    );

    this.teachingAssitantItems$ = this.teachingAssistantDataRequest$.pipe(
      map((items) => items.map(({ id }) => id)),
      startWith(null)
    );

    this.doctorDataRequest$.subscribe((res) => {
      this.doctorData = res;
    });
    this.teachingAssistantDataRequest$.subscribe((res) => {
      this.teachingAssistantsData = res;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    serverData.course = { id: this.courseID };
    let instructors: Employee[] = [];
    (serverData.doctors as any[]).forEach((id) => {
      let val = this.doctorData.find((employee) => employee.id === id);
      if (val) {
        instructors.push(val);
      }
    });
    (serverData.teachingAssistants as any[]).forEach((id) => {
      let val = this.teachingAssistantsData.find((employee) => employee.id === id);
      console.log(val, "teachingAssistantsData");

      if (val) {
        instructors.push(val);
      }
    });
    serverData.instructors = instructors;
    delete serverData.doctors;
    delete serverData.teachingAssistants;

    if (this.isEditMode) {
      serverData.id = this.courseGroupID;
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
