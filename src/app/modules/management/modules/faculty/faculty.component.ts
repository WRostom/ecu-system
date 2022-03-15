import { Component, OnInit } from "@angular/core";

import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.scss"],
})
export class FacultyComponent implements OnInit {
  searchTerm!: string;
  readonly columns = ["id", "facultyName"];
  open = false;

  toggle(open: boolean) {
    this.open = open;
  }

  users: readonly Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
    {
      id: "2",
      facultyName: "Informatics and Computer Science",
    },
    {
      id: "3",
      facultyName: "Informatics and Computer Science",
    },
    {
      id: "4",
      facultyName: "Informatics and Computer Science",
    },
    {
      id: "5",
      facultyName: "Informatics and Computer Science",
    },
  ];
  constructor() {}

  remove(item: Faculty) {
    this.users = this.users.filter((faculty) => faculty !== item);
  }

  ngOnInit(): void {}
}
