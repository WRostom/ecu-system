import { Component, OnInit } from "@angular/core";

import { map, share } from "rxjs";
import { AcademicYearReferenceDaoService } from "src/app/core/api/academic-year-reference-dao.service";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { ServerTimeService } from "src/app/core/services/server-time.service";
import { AcademicYearReference } from "src/app/shared/models/academicYearReference.model";
import { Semester } from "src/app/shared/models/semester.model";

@Component({
  selector: "app-semester",
  templateUrl: "./semester.component.html",
  styleUrls: ["./semester.component.scss"],
})
export class SemesterComponent implements OnInit {
  showPrevHistory: boolean = false;
  open = false;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentEducationYear: fullYearView;
  previousEducationSemesters: fullYearView[] = [];
  nextEducationSemesters: fullYearView[] = [];
  semesterDataRequest$ = this.academicYearReferenceDAO.getAll().pipe(share());
  readonly loading$ = this.semesterDataRequest$.pipe(map((value) => !value));

  constructor(
    private semesterDAO: SemesterDAOService,
    private serverTimeService: ServerTimeService,
    private academicYearReferenceDAO: AcademicYearReferenceDaoService
  ) {
    this.serverTimeService.getServerTime().subscribe((time) => {
      this.currentYear = new Date(time).getFullYear();
      this.currentMonth = new Date(time).getMonth();
    });
  }

  ngOnInit(): void {
    this.semesterDataRequest$.subscribe((res) => {
      res.forEach((semester) => {
        if (+semester.semesterYear.includes(`${this.currentYear}`)) {
          if (+semester.semesterYear.split("/")[1] === this.currentYear && this.currentMonth < 7) {
            this.addToCurrentYear(semester);
          }

          if (+semester.semesterYear.split("/")[1] === this.currentYear && this.currentMonth > 7) {
            this.addToPreviousYear(semester);
          }

          if (+semester.semesterYear.split("/")[0] === this.currentYear && this.currentMonth > 7) {
            this.addToCurrentYear(semester);
          }

          if (+semester.semesterYear.split("/")[0] === this.currentYear && this.currentMonth < 7) {
            this.addToNextYear(semester);
          }
        } else {
          if (+semester.semesterYear.split("/")[0] < this.currentYear) {
            this.addToPreviousYear(semester);
          }
          if (+semester.semesterYear.split("/")[0] > this.currentYear) {
            this.addToNextYear(semester);
          }
        }
      });
    });
  }

  addToCurrentYear(semester: AcademicYearReference) {
    if (!this.currentEducationYear) {
      this.currentEducationYear = {
        id: semester.id,
        year: semester.semesterYear,
        semesterOne: semester.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.semesterNumber == 2 ? [semester] : [],
      };
    } else {
      if (semester.semesterNumber == 1) {
        this.currentEducationYear.semesterOne.push(semester);
      }
      if (semester.semesterNumber == 2) {
        this.currentEducationYear.semesterTwo.push(semester);
      }
    }
  }

  addToPreviousYear(semester: AcademicYearReference) {
    let existingYear = this.previousEducationSemesters.findIndex((sem) => sem.year == semester.semesterYear);

    if (existingYear == -1) {
      this.previousEducationSemesters.push({
        id: semester.id,
        year: semester.semesterYear,
        semesterOne: semester.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.semesterNumber == 2 ? [semester] : [],
      });
    } else {
      if (semester.semesterNumber == 1) {
        this.previousEducationSemesters[existingYear].semesterOne.push(semester);
      }
      if (semester.semesterNumber == 2) {
        this.previousEducationSemesters[existingYear].semesterTwo.push(semester);
      }
    }
  }

  addToNextYear(semester: AcademicYearReference) {
    let existingYear = this.nextEducationSemesters.findIndex((sem) => sem.year == semester.semesterYear);

    if (existingYear == -1) {
      this.nextEducationSemesters.push({
        id: semester.id,
        year: semester.semesterYear,
        semesterOne: semester.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.semesterNumber == 2 ? [semester] : [],
      });
    } else {
      if (semester.semesterNumber == 1) {
        this.nextEducationSemesters[existingYear].semesterOne.push(semester);
      }
      if (semester.semesterNumber == 2) {
        this.nextEducationSemesters[existingYear].semesterTwo.push(semester);
      }
    }
  }

  toggle(open: boolean, refresh?: boolean) {
    this.open = open;

    if (refresh) {
      this.ngOnInit();
    }
  }
}

export interface fullYearView {
  id: string;
  year: string;
  semesterOne: AcademicYearReference[];
  semesterTwo: AcademicYearReference[];
}
