import { Component, OnInit } from "@angular/core";

import { map } from "rxjs";
import { DepartmentDAOService } from "src/app/core/api/department-dao.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "departmentName"];
  open = false;

  departmentDataRequest$ = this.departmentDAO.getAll();
  readonly loading$ = this.departmentDataRequest$.pipe(map((value) => !value));

  constructor(private departmentDAO: DepartmentDAOService) {}

  ngOnInit(): void {}

  toggle(open: boolean, refresh?: boolean) {
    this.open = open;

    if (refresh) {
      this.departmentDataRequest$ = this.departmentDAO.getAll();
    }
  }
}
