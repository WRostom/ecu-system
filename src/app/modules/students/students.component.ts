import { Component, OnInit } from "@angular/core";

import { map } from "rxjs";
import { StudentDAOService } from "src/app/core/api/student-dao.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentsComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "fullName", "mobile", "email", "faculty"];
  open = false;

  studentDataRequest$ = this.studentDAO.getAll();
  readonly loading$ = this.studentDataRequest$.pipe(map((value) => !value));

  constructor(private studentDAO: StudentDAOService) {}

  ngOnInit(): void {}
  toggle(open: any, refresh?: boolean) {
    this.open = open;

    if (refresh) {
      this.studentDataRequest$ = this.studentDAO.getAll();
    }
  }
}
