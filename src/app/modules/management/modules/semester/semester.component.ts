import { Component, OnInit } from "@angular/core";

import { map, share } from "rxjs";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { ServerTimeService } from "src/app/core/services/server-time.service";
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
  semesterDataRequest$ = this.semesterDAO.getAll().pipe(share());
  readonly loading$ = this.semesterDataRequest$.pipe(map((value) => !value));

  constructor(private semesterDAO: SemesterDAOService, private serverTimeService: ServerTimeService) {
    this.serverTimeService.getServerTime().subscribe((time) => {
      this.currentYear = new Date(time).getFullYear();
      this.currentMonth = new Date(time).getMonth();
    });
  }

  ngOnInit(): void {
    this.semesterDataRequest$.subscribe((res) => {
      res.forEach((semester) => {
        if (+semester.id.semesterYear.includes(`${this.currentYear}`)) {
          if (+semester.id.semesterYear.split("/")[1] === this.currentYear && this.currentMonth < 7) {
            this.addToCurrentYear(semester);
          }
          if (+semester.id.semesterYear.split("/")[1] === this.currentYear && this.currentMonth > 7) {
            this.addToPreviousYear(semester);
          }
          if (+semester.id.semesterYear.split("/")[0] === this.currentYear && this.currentMonth > 7) {
            this.addToCurrentYear(semester);
          }

          if (+semester.id.semesterYear.split("/")[0] === this.currentYear && this.currentMonth < 7) {
            this.addToNextYear(semester);
          }
        } else {
          if (+semester.id.semesterYear.split("/")[0] < this.currentYear) {
            this.addToPreviousYear(semester);
          }
          if (+semester.id.semesterYear.split("/")[0] > this.currentYear) {
            this.addToNextYear(semester);
          }
        }
      });
    });
  }

  addToCurrentYear(semester: Semester) {
    if (!this.currentEducationYear) {
      this.currentEducationYear = {
        year: semester.id.semesterYear,
        semesterOne: semester.id.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.id.semesterNumber == 2 ? [semester] : [],
      };
    } else {
      if (semester.id.semesterNumber == 1) {
        this.currentEducationYear.semesterOne.push(semester);
      }
      if (semester.id.semesterNumber == 2) {
        this.currentEducationYear.semesterTwo.push(semester);
      }
    }
  }

  addToPreviousYear(semester: Semester) {
    let existingYear = this.previousEducationSemesters.findIndex((sem) => sem.year == semester.id.semesterYear);

    if (existingYear == -1) {
      this.previousEducationSemesters.push({
        year: semester.id.semesterYear,
        semesterOne: semester.id.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.id.semesterNumber == 2 ? [semester] : [],
      });
    } else {
      if (semester.id.semesterNumber == 1) {
        this.previousEducationSemesters[existingYear].semesterOne.push(semester);
      }
      if (semester.id.semesterNumber == 2) {
        this.previousEducationSemesters[existingYear].semesterTwo.push(semester);
      }
    }
  }

  addToNextYear(semester: Semester) {
    let existingYear = this.nextEducationSemesters.findIndex((sem) => sem.year == semester.id.semesterYear);

    if (existingYear == -1) {
      this.nextEducationSemesters.push({
        year: semester.id.semesterYear,
        semesterOne: semester.id.semesterNumber == 1 ? [semester] : [],
        semesterTwo: semester.id.semesterNumber == 2 ? [semester] : [],
      });
    } else {
      if (semester.id.semesterNumber == 1) {
        this.nextEducationSemesters[existingYear].semesterOne.push(semester);
      }
      if (semester.id.semesterNumber == 2) {
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
  year: string;
  semesterOne: Semester[];
  semesterTwo: Semester[];
}
