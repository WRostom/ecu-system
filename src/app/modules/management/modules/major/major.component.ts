import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-major",
  templateUrl: "./major.component.html",
  styleUrls: ["./major.component.scss"],
})
export class MajorComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "facultyName"];
  open = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    majorName: new FormControl("", Validators.required),
    facultyID: new FormControl("1", Validators.required),
  });

  data: Faculty[] = [
    {
      id: "1",
      facultyName: "Computer Networks",
    },
    {
      id: "2",
      facultyName: "Computer Science",
    },
    {
      id: "3",
      facultyName: "Software Engineer",
    },
  ];
  faculty: Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
  ];
  createLoading: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  remove(item: Faculty) {
    this.data = this.data.filter((data) => data !== item);
  }

  toggle(open: boolean) {
    this.open = open;
  }

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      let us = this.data;
      us.push(this.createNew.value);
      this.data = us.map((val) => val);
      this.toggle(false);
      this.createLoading = false;
    }, 3000);
  }

  @tuiPure
  stringify(faculty: { id: string; facultyName: string }[]): any {
    const map = new Map(faculty.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
