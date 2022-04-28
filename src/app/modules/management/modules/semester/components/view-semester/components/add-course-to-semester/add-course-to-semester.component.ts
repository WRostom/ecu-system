import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit } from "@taiga-ui/cdk";
import { map, Observable, share, startWith } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { Course } from "src/app/shared/models/course.model";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-add-course-to-semester",
  templateUrl: "./add-course-to-semester.component.html",
  styleUrls: ["./add-course-to-semester.component.scss"],
})
export class AddCourseToSemesterComponent implements OnInit {
  @Input("courseList") set courseList(data: Course[]) {
    this.createNew.patchValue({
      offeredCourses: data.map((course) => course.id),
    });
  }
  @Input("semesterID") semesterID: { semesterYear: string; semesterNumber: number };
  @Input("facultyID") facultyID: string;
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isEditMode: boolean = false;
  createLoading: boolean = false;
  createNew = new FormGroup({
    offeredCourses: new FormControl([], Validators.required),
  });
  courseDataRequest$: Observable<Course[]>;
  courseStringify$: Observable<(id: string | TuiContextWithImplicit<string>) => any>;
  courseItems$: Observable<string[]>;

  constructor(private courseDAO: CoursesDaoService, private semesterDAO: SemesterDAOService) {}

  ngOnInit(): void {
    this.courseDataRequest$ = this.courseDAO.getCoursesByFaculty(this.facultyID).pipe(share());
    this.courseStringify$ = this.courseDataRequest$.pipe(
      map((items) => new Map(items.map((course: Course) => [course.id, course.courseName] as [string, string]))),
      startWith(new Map()),
      map((map) => (id: string | TuiContextWithImplicit<string>) => typeof id == "string" ? map.get(id) : map.get(id.$implicit))
    );
    this.courseItems$ = this.courseDataRequest$.pipe(map((items) => items.map((item) => item.id)));
  }

  onSubmit() {
    this.createLoading = true;
    const dataCopy = Object.assign(this.createNew.value, {});

    this.semesterDAO
      .update({
        id: {
          ...this.semesterID,
          semesterFacultyId: this.facultyID,
        },
        offeredCourses: dataCopy.offeredCourses,
        faculty: { id: this.facultyID } as Faculty,
      })
      .subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    // const serverData: createSemesterToAllFacultiesRequest = {
    //   semesterYear: `${dataCopy.semesterStartYear}/${+dataCopy.semesterStartYear + 1}`,
    //   semesterNumber: dataCopy.semesterNumber,
    //   facultiesArray: dataCopy.facultiesArray.map((facultyID: string) => {
    //     return { id: facultyID };
    //   }),
    // };
    // console.log(serverData, "data");
    // this.semesterDAO.createSemesterToAllFaculties(serverData).subscribe((res) => {
    // this.openSidebar.emit(false);
    // this.createLoading = false;
    // });
  }
}
