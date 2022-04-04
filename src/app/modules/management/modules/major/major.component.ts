import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { map } from "rxjs";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { MajorDaoService } from "src/app/core/api/major-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-major",
  templateUrl: "./major.component.html",
  styleUrls: ["./major.component.scss"],
})
export class MajorComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "majorName", "facultyName"];
  open = false;

  majorDataRequest$ = this.majorDAO.getAll();
  readonly loading$ = this.majorDataRequest$.pipe(map((value) => !value));

  constructor(private majorDAO: MajorDaoService) {}

  ngOnInit(): void {}

  toggle(open: boolean) {
    this.open = open;
  }
}
