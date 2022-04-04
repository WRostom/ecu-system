import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"],
})
export class AddCourseComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  createLoading: boolean = false;

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

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.openSidebar.emit(false);
      this.createLoading = false;
    }, 3000);
  }

  @tuiPure
  stringifyFaculty(faculty: any[]): any {
    const map = new Map(faculty.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }

  @tuiPure
  stringifyMajor(faculty: any[]): any {
    const map = new Map(faculty.map(({ id, majorName }) => [id, majorName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
