import { Component, OnInit } from "@angular/core";

import { map } from "rxjs";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "fullName", "type", "department", "email"];
  open = false;
  employeeDataRequest$ = this.employeeDAO.getAll();
  readonly loading$ = this.employeeDataRequest$.pipe(map((value) => !value));

  constructor(private employeeDAO: EmployeeDAOService) {}

  ngOnInit(): void {}
  toggle(open: any, refresh?: boolean) {
    this.open = open;

    if (refresh) {
      this.employeeDataRequest$ = this.employeeDAO.getAll();
    }
  }
}
