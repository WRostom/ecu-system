import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";
import { Employee } from "src/app/shared/models/employee.model";

@Component({
  selector: "app-view-employee",
  templateUrl: "./view-employee.component.html",
  styleUrls: ["./view-employee.component.scss"],
})
export class ViewEmployeeComponent implements OnInit {
  open: any;

  employeeDataRequest$: Observable<Employee>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;

  constructor(private employeeDAO: EmployeeDAOService, private location: Location, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.employeeDataRequest$ = this.employeeDAO.getOne({ id: val["id"] });
        this.loading$ = this.employeeDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }
  toggle(open: any) {
    this.open = open;
  }
  editStudent(student: any) {
    // this.student = [...this.student, student];
    this.toggle(false);
  }
  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.employeeDataRequest$ = this.employeeDAO.getOne({ id: this.pageID });
    }
  }
}
