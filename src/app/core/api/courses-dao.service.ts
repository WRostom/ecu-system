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
export class CoursesDaoService extends GlobalDAOService<any> {
  constructor(api: ApiService) {
    super("courses", api);
  }

  override getOne(id: string): Observable<any> {
    let faculty = new Faculty("1", "hello");
    let major = new Major("1", "hello", faculty);
    // let student = new new Student("Waleed", "rostom", personType.STUDENT, "waleedrostom@", "1", "1", "id", faculty);
    return new Observable((observer) => {
      observer.next(new Course("1", "hello1", "1", ["1"], major, faculty, 1, 1, "hello"));
    });
  }
}
