import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Course } from "src/app/shared/models/course.model";
import { CourseStudent } from "src/app/shared/models/courseStudent.model";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";
import { personType } from "src/app/shared/models/person.model";
import { Student } from "src/app/shared/models/student.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class CoursesDaoService extends GlobalDAOService<Course> {
  constructor(api: ApiService) {
    super("course", api);
  }
}
