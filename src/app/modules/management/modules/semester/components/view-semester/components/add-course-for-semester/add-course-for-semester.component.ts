import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BehaviorSubject, distinctUntilChanged, filter, first, map, Observable, of, ReplaySubject, share, Subject, switchMap } from "rxjs";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { Course } from "src/app/shared/models/course.model";
import { Semester } from "src/app/shared/models/semester.model";
import { CourseNameFromIDPipe } from "src/app/shared/pipes/course-name-from-id.pipe";

@Component({
  selector: "app-add-course-for-semester",
  templateUrl: "./add-course-for-semester.component.html",
  styleUrls: ["./add-course-for-semester.component.scss"],
})
export class AddCourseForSemesterComponent implements OnInit {
  selectedFaculty: string;
  semesterDataRequest$: Observable<Semester[]>;
  loading$ = of(true);
  columns = ["id", "courseName", "majorName"];
  pageID: { semesterYear: string; semesterNumber: number };
  offeredCourses$: Observable<Course[]>;
  open: boolean = false;
  majorFilters$: BehaviorSubject<{ name: string; selected: boolean }[]> = new BehaviorSubject(null);
  filterValues: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private semesterDAO: SemesterDAOService,
    private courseNameFromIDPipe: CourseNameFromIDPipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((parentVal) => {
      if (parentVal && parentVal["id"]) {
        this.pageID = {
          semesterYear: parentVal["id"]?.split("-")[0].split(".").join("/"),
          semesterNumber: +parentVal["id"]?.split("-")[1],
        };
      }
      this.activatedRoute.params.subscribe((val) => {
        if (val && val["faculty"]) {
          this.selectedFaculty = val["faculty"];
          this.loading$ = of(true);
          this.offeredCourses$ = null;
          this.semesterDataRequest$ = this.semesterDAO.getSemestersByFacultyIdAndYear(this.pageID, val["faculty"]).pipe(
            map((value) => value.filter((semester) => semester.id.semesterNumber === this.pageID.semesterNumber)),
            share()
          );

          this.updateOfferedCourse();

          this.offeredCourses$
            .pipe(
              map((value) => ["All", "No Major", ...new Set(value.map((course) => course.major.majorName))]),
              map((va) =>
                va.map((v) => {
                  return { name: v, selected: false };
                })
              )
            )
            .subscribe(this.majorFilters$);

          this.loading$ = this.offeredCourses$.pipe(map((value) => !value));
        } else {
          // this.goBack();
        }
      });
    });
  }

  updateOfferedCourse() {
    this.offeredCourses$ = this.semesterDataRequest$.pipe(
      map((semester) => (semester && semester.length > 0 ? (semester[0].offeredCourses ? semester[0].offeredCourses : []) : [])),
      switchMap((courses) => this.courseNameFromIDPipe.transform(courses).pipe(share())),
      map((offeredCourses) =>
        this.filterValues.length > 0 ? offeredCourses.filter((val) => this.filterValues.includes(val.major.majorName)) : offeredCourses
      ),
      share()
    );
  }

  toggleCourseAdd(open: any, refresh?: boolean) {
    this.open = open;
    if (refresh) {
      this.updateOfferedCourse();
    }
  }

  selectFilter(index: number, array: { name: string; selected: boolean }[]) {
    array[index].selected = !array[index].selected;
    let tempArray: string[] = [];
    array.forEach((val) => {
      if (val.selected) {
        tempArray.push(val.name);
      }
    });

    this.filterValues = tempArray;
    this.majorFilters$.next(array);
    this.updateOfferedCourse();
  }
}
