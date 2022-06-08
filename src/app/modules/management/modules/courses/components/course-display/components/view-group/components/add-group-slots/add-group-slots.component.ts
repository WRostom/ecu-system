import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { daysOfWeek, slotTypeList } from "@config/dateItems";
import { TUI_DEFAULT_MATCHER, TuiContextWithImplicit, TuiDay, TuiIdentityMatcher, tuiPure, TuiStringHandler, TuiTime } from "@taiga-ui/cdk";
import { tuiCreateTimePeriods, tuiItemsHandlersProvider } from "@taiga-ui/kit";
import { zonedTimeToUtc } from "date-fns-tz";
import { map, share, startWith, switchMap } from "rxjs";
import { CourseGroupDaoService } from "src/app/core/api/course-group-dao.service";
import { CourseGroupSlotDAOService } from "src/app/core/api/course-group-slot-dao.service";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";
import { slotTypes } from "src/app/shared/models/courseGroupSlots";
import { Employee } from "src/app/shared/models/employee.model";

@Component({
  selector: "app-add-group-slots",
  templateUrl: "./add-group-slots.component.html",
  styleUrls: ["./add-group-slots.component.scss"],
})
export class AddGroupSlotsComponent implements OnInit, AfterViewInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.courseGroupSlotsService.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        day: res.day,
        startTime: new TuiTime(new Date(res.startTime).getHours(), new Date(res.startTime).getMinutes()),
        endTime: new TuiTime(new Date(res.endTime).getHours(), new Date(res.endTime).getMinutes()),
        slotType: res.slotType,
        room: res.room,
      });
    });
  }
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  courseGroupID: string;
  @Input("courseID") set courseIdentifier(data: any) {
    this.courseGroupID = data;
  }
  todaysDate: TuiDay = new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
  createNew = new FormGroup({
    day: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    slotType: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
  });
  createLoading: boolean = false;

  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  public daysOfTheWeek = daysOfWeek;
  public slotTypeList = slotTypeList;
  timeItems = tuiCreateTimePeriods(8, 18, [0, 15, 30, 45]);

  employeeData: Employee[];

  constructor(private courseGroupSlotsService: CourseGroupSlotDAOService, private employeeDAO: EmployeeDAOService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    const startTime: TuiTime = serverData.startTime;
    const endTime: TuiTime = serverData.endTime;
    serverData.startTime = zonedTimeToUtc(new Date(new Date().setHours(startTime.hours, startTime.minutes)), this.timezone).toISOString();
    serverData.endTime = zonedTimeToUtc(new Date(new Date().setHours(endTime.hours, endTime.minutes)), this.timezone).toISOString();
    serverData.courseGroup = { id: this.courseGroupID };

    if (this.isEditMode) {
      this.courseGroupSlotsService.update(serverData).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    } else {
      this.courseGroupSlotsService.create(serverData).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    }
  }
}
