import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  searchTerm!: string;
  readonly data = [
    {
      name: "Alex Inkin",
      balance: 1323525,
    },
    {
      name: "Roman Sedov",
      balance: 423242,
    },
  ] as const;

  readonly columns = Object.keys(this.data[0]);
  constructor() {}

  ngOnInit(): void {}
}
