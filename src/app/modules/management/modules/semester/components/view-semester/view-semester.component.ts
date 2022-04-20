import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, of } from "rxjs";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { Semester } from "src/app/shared/models/semester.model";

@Component({
  selector: "app-view-semester",
  templateUrl: "./view-semester.component.html",
  styleUrls: ["./view-semester.component.scss"],
})
export class ViewSemesterComponent implements OnInit {
  pageID: { year: string; semester: number };
  loading$: any = of(true);
  semesterDataRequest$: Observable<Semester>;

  constructor(private semesterDAO: SemesterDAOService, private location: Location, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = {
          year: val["id"]?.split("-")[0].split(".").join("/"),
          semester: val["id"]?.split("-")[1],
        };

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
