import { Pipe, PipeTransform } from "@angular/core";

import { forkJoin, Observable, share } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";

import { Course } from "../models/course.model";

@Pipe({
  name: "courseNameFromID",
})
export class CourseNameFromIDPipe implements PipeTransform {
  constructor(private courseDAO: CoursesDaoService) {}
  transform(value: string[]): Observable<Course[]> {
    let courseObs$ = value?.map((val) => this.courseDAO.getOne({ id: val }).pipe(share()));

    return forkJoin(courseObs$);
  }
}
