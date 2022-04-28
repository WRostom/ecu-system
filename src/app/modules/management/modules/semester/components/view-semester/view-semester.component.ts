import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, of, share } from "rxjs";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { Semester } from "src/app/shared/models/semester.model";

@Component({
  selector: "app-view-semester",
  templateUrl: "./view-semester.component.html",
  styleUrls: ["./view-semester.component.scss"],
})
export class ViewSemesterComponent implements OnInit {
  pageID: { semesterYear: string; semesterNumber: number };
  loading$: any = of(true);
  semesterDataRequest$: Observable<Semester>;
  facultyDataRequest$ = this.facultyDAO.getAll().pipe(share());

  constructor(
    private semesterDAO: SemesterDAOService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private facultyDAO: FacultyDAOService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = {
          semesterYear: val["id"]?.split("-")[0].split(".").join("/"),
          semesterNumber: +val["id"]?.split("-")[1],
        };
        this.semesterDataRequest$ = this.semesterDAO.getOne({ id: this.pageID });

        this.loading$ = this.semesterDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
