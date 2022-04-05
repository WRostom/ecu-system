import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { CoursesDaoService } from "src/app/core/api/courses-dao.service";
import { StudentDAOService } from "src/app/core/api/student-dao.service";
import { Course } from "src/app/shared/models/course.model";
import { Student } from "src/app/shared/models/student.model";

@Component({
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.scss"],
})
export class ViewStudentComponent implements OnInit {
  open: any;

  studentDataRequest$: Observable<Student>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;

  constructor(private studentDAO: StudentDAOService, private location: Location, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.studentDataRequest$ = this.studentDAO.getOne({ id: val["id"] });
        this.loading$ = this.studentDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }
  toggle(open: any) {
    this.open = open;
  }
  editStudent(student: any) {
    // this.student = [...this.student, student];
    this.toggle(false);
  }
  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.studentDataRequest$ = this.studentDAO.getOne({ id: this.pageID });
    }
  }
}
