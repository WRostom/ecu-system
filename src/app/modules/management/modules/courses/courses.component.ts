import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { map } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { Course } from "src/app/shared/models/course.model";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "courseName", "facultyName", "majorName"];
  open = false;

  coursesDataRequest$ = this.courseDAO.getAll();
  readonly loading$ = this.coursesDataRequest$.pipe(map((value) => !value));

  constructor(private courseDAO: CoursesDaoService, private router: Router) {}

  ngOnInit(): void {}

  toggle(open: boolean) {
    this.open = open;
  }

  goToCourse(courseID: string) {
    this.router.navigate(["course", courseID]);
  }
}
