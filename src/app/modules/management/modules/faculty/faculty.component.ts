import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.scss"],
})
export class FacultyComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "facultyName"];
  open = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    facultyName: new FormControl("", Validators.required),
  });

  users: Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
  ];
  createLoading: boolean = false;
  constructor(private facultyDAO: FacultyDAOService) {}

  ngOnInit(): void {}

  remove(item: Faculty) {
    this.users = this.users.filter((faculty) => faculty !== item);
  }

  toggle(open: boolean) {
    this.open = open;
  }

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      let us = this.users;
      us.push(this.createNew.value);
      this.users = us.map((val) => val);
      this.toggle(false);
      this.createLoading = false;
    }, 3000);
  }
}
