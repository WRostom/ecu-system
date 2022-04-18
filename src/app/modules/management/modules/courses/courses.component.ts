import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { map } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";

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

  toggle(open: boolean, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.coursesDataRequest$ = this.courseDAO.getAll();
    }
  }

  goToCourse(courseID: string) {
    this.router.navigate(["course", courseID]);
  }
}
