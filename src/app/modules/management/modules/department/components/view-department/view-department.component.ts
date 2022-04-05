import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, of } from "rxjs";
import { DepartmentDAOService } from "src/app/core/api/department-dao.service";
import { Department } from "src/app/shared/models/department.model";

@Component({
  selector: "app-view-department",
  templateUrl: "./view-department.component.html",
  styleUrls: ["./view-department.component.scss"],
})
export class ViewDepartmentComponent implements OnInit {
  departmentDataRequest$: Observable<Department>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;
  constructor(private departmentDAO: DepartmentDAOService, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.departmentDataRequest$ = this.departmentDAO.getOne({ id: val["id"] });
        this.loading$ = this.departmentDataRequest$.pipe(map((value) => !value));
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
      this.departmentDataRequest$ = this.departmentDAO.getOne({ id: this.pageID });
    }
  }
}
