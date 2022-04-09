import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { share } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { MajorDaoService } from "src/app/core/api/major-dao.service";
import { Course } from "src/app/shared/models/course.model";
import { Faculty } from "src/app/shared/models/faculty.model";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"],
})
export class AddCourseComponent implements OnInit, AfterViewInit {
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.courseDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        id: res.id,
        courseName: res.courseName,
        credits: res.credits,
        prerequisiteList: res.prerequisteList,
        majorID: res.major.id,
        facultyID: res.faculty.id,
        maxNoStudents: res.maxNoStudents,
        currentNoStudents: res.currentNoStudents,
      });
    });
  }
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isEditMode: boolean = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    courseName: new FormControl("", Validators.required),
    credits: new FormControl("", Validators.required),
    prerequisiteList: new FormControl(["MATH_1"], Validators.required),
    majorID: new FormControl(null, Validators.required),
    facultyID: new FormControl(null, Validators.required),
    maxNoStudents: new FormControl(0),
    currentNoStudents: new FormControl(0),
  });
  createLoading: boolean = false;

  facultyDataRequest$ = this.facultyDAO.getAll().pipe(share());
  facultyData: Faculty[];
  majorDataRequest$ = this.majorDAO.getAll().pipe(share());
  majorData: Major[];

  constructor(private facultyDAO: FacultyDAOService, private courseDAO: CoursesDaoService, private majorDAO: MajorDaoService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.facultyDataRequest$.subscribe((faculty: Faculty[]) => {
      this.facultyData = faculty;
    });
    this.majorDataRequest$.subscribe((major: Major[]) => {
      this.majorData = major;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    serverData.faculty = this.facultyData.find((faculty) => faculty.id === this.createNew.value.facultyID);
    serverData.major = this.majorData.find((major) => major.id === this.createNew.value.majorID);
    delete serverData.facultyID;
    delete serverData.majorID;
    if (this.isEditMode) {
      this.courseDAO.update(serverData).subscribe(
        (res) => {
          this.openSidebar.emit(false);
          this.createLoading = false;
        },
        (err) => {
          console.log(err, "error response");
        }
      );
    } else {
      this.courseDAO.create(serverData).subscribe(
        (res) => {
          this.openSidebar.emit(false);
          this.createLoading = false;
        },
        (err) => {
          console.log(err, "error response");
        }
      );
    }
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
