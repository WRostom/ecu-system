import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, of } from "rxjs";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-view-faculty",
  templateUrl: "./view-faculty.component.html",
  styleUrls: ["./view-faculty.component.scss"],
})
export class ViewFacultyComponent implements OnInit {
  facultyDataRequest$: Observable<Faculty>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;
  constructor(private facultyDAO: FacultyDAOService, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.facultyDataRequest$ = this.facultyDAO.getOne({ id: val["id"] });
        this.loading$ = this.facultyDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.facultyDataRequest$ = this.facultyDAO.getOne({ id: this.pageID });
    }
  }
}
