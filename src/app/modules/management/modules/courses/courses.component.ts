import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  searchTerm!: string;
  columns = ["id", "facultyName"];
  open = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    courseName: new FormControl("", Validators.required),
    credits: new FormControl("", Validators.required),
    prerequisiteList: new FormControl([""], Validators.required),
    majorID: new FormControl("1", Validators.required),
    facultyID: new FormControl("1", Validators.required),
    maxNoStudents: new FormControl(0),
    currentNoStudents: new FormControl(0),
    courseRoom: new FormControl(""),
  });

  data: Faculty[] = [
    {
      id: "1",
      facultyName: "Programming 101",
    },
    {
      id: "2",
      facultyName: "Introduction to Computer Networks",
    },
    {
      id: "3",
      facultyName: "Business and Managment 101",
    },
  ];
  faculty: Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
  ];

  major: Major[] = [
    {
      id: "1",
      majorName: "Computer Networks",
      faculty: new Faculty("1", "hello1"),
    },
    {
      id: "2",
      majorName: "Computer Science",
      faculty: new Faculty("2", "hello2"),
    },
    {
      id: "3",
      majorName: "Software Engineer",
      faculty: new Faculty("3", "hello3"),
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
  stringify(faculty: any[]): any {
    const map = new Map(faculty.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
