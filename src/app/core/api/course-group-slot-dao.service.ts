import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { CourseGroupSlot } from "src/app/shared/models/courseGroupSlots";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class CourseGroupSlotDAOService extends GlobalDAOService<CourseGroupSlot> {
  constructor(api: ApiService) {
    super("course-group-slots", api);
  }

  getAllGroupsSlotsByCourseGroupID(courseID: string): Observable<CourseGroupSlot[]> {
    return this.api.postRequest<CourseGroupSlot[]>(`${this.pageName}/getAllGroupsSlotsByCourseGroupID`, [{ id: courseID }]);
  }
}
