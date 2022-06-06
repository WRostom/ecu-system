import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { CourseGroup } from "src/app/shared/models/courseGroup.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class CourseGroupDaoService extends GlobalDAOService<CourseGroup> {
  constructor(api: ApiService) {
    super("course-group", api);
  }

  getAllCourseGroupByCourseId(courseID: string): Observable<CourseGroup[]> {
    return this.api.postRequest<CourseGroup[]>(`${this.pageName}/getAllCourseGroupByCourseId`, [{ id: courseID }]);
  }
}
