import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { utcToZonedTime } from "date-fns-tz";
import { map, Observable, of, share } from "rxjs";
import { CourseGroupDaoService } from "src/app/core/api/course-group-dao.service";
import { CourseGroupSlotDAOService } from "src/app/core/api/course-group-slot-dao.service";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { CourseGroup } from "src/app/shared/models/courseGroup.model";
import { CourseGroupSlot } from "src/app/shared/models/courseGroupSlots";
import { Employee } from "src/app/shared/models/employee.model";
import { personType, personTypeString } from "src/app/shared/models/person.model";

import { DisplayCourseGroupData } from "../../course-display.component";

@Component({
  selector: "app-view-group",
  templateUrl: "./view-group.component.html",
  styleUrls: ["./view-group.component.scss"],
})
export class ViewGroupComponent implements OnInit {
  viewDate: Date = new Date();
  open = false;
  openEdit: boolean;
  pageID: string;
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  loading$: any = of(true);
  courseGroupDataRequest$: Observable<CourseGroup>;
  courseGroupDataSlotRequest$: Observable<CourseGroupSlot[]>;
  courseGroupDataSlots: any[];
  loadingGroupSlots: boolean = true;
  columns = ["slotNo", "day", "startTime", "endTime", "type", "room", "action"];
  public personTypes = personTypeString;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private courseDAO: CoursesDaoService,
    private courseGroupDAO: CourseGroupDaoService,
    private courseGroupSlotDAO: CourseGroupSlotDAOService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["groupid"]) {
        this.pageID = val["groupid"];
        this.courseGroupDataRequest$ = this.courseGroupDAO.getOne({ id: this.pageID }).pipe(share());
        this.courseGroupDataSlotRequest$ = this.courseGroupSlotDAO.getAllGroupsSlotsByCourseGroupID(this.pageID).pipe(
          map((val: CourseGroupSlot[]) => {
            return val.map((res) => {
              res.startTime = utcToZonedTime(new Date(res.startTime + "Z"), this.timezone);
              res.endTime = utcToZonedTime(new Date(res.endTime + "Z"), this.timezone);
              return res;
            });
          })
        );
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  ngAfterContentInit(): void {
    this.getCourseGroupData();
  }

  getCourseGroupData() {
    this.courseGroupDataSlots = [];
    this.courseGroupDataSlotRequest$.subscribe((val: CourseGroupSlot[]) => {
      let tempCourseGroupSlotData: DisplayCourseGroupSlotsData[] = val;
      for (let i = 0; i < tempCourseGroupSlotData.length; i++) {
        tempCourseGroupSlotData[i].color = { primary: `hsl(${Math.random() * (359 - 0) + 0}, 83%, ${Math.random() * (60 - 40) + 40}%)` };
      }
      this.courseGroupDataSlots = tempCourseGroupSlotData;
      this.loadingGroupSlots = false;
    });
  }

  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.courseGroupDataRequest$ = this.courseGroupDAO.getOne({ id: this.pageID }).pipe(share());
    }
  }

  toggleSlotAdd(open: any, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.getCourseGroupData();
    }
  }
  toggleSlotEdit(open: any, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.getCourseGroupData();
    }
  }

  deleteGroup(groupID: string) {
    this.courseGroupSlotDAO.delete(groupID).subscribe(() => {
      this.getCourseGroupData();
    });
  }

  displayCertainInstructor(instructors: Employee[], type: personTypeString) {
    if (!instructors) {
      return "";
    }

    let val = instructors
      .filter((employee) => (employee.type as unknown as personTypeString) === type)
      .map((val) => `${val.firstName} ${val.lastName}`)
      .join(", ");

    return val;
  }
}

export interface DisplayCourseGroupSlotsData extends CourseGroupSlot {
  color?: any;
}
