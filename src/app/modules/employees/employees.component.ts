import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  searchTerm!: string;
  columns = ["fullName", "mobile", "email"];
  open = false;
  users: any[] = [
    {
      firstName: "Ahmed",
      lastName: "Hisham",
      mobileNumber: "+201100781855",
      email: "localhosta@localhost.com",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  toggle(open: any) {
    this.open = open;
  }

  addEmployee(employee:any) {
    this.users = [
      ...this.users,
      employee
    ]
    this.toggle(false)
  }
}
