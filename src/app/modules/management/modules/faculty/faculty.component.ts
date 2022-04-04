import { Component, OnInit } from "@angular/core";

import { map } from "rxjs";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.scss"],
})
export class FacultyComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "facultyName"];
  open = false;

  facultyDataRequest$ = this.facultyDAO.getAll();
  readonly loading$ = this.facultyDataRequest$.pipe(map((value) => !value));

  constructor(private facultyDAO: FacultyDAOService) {}

  ngOnInit(): void {}

  toggle(open: boolean) {
    this.open = open;
  }
}
