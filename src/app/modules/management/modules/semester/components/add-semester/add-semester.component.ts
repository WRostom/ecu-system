import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { EMPTY_ARRAY, TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiValueContentContext } from "@taiga-ui/core";
import { map, share, startWith } from "rxjs";
import { AcademicYearReferenceDaoService } from "src/app/core/api/academic-year-reference-dao.service";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { createSemesterToAllFacultiesRequest, SemesterDAOService } from "src/app/core/api/semester-dao.service";
import { ServerTimeService } from "src/app/core/services/server-time.service";
import { AcademicYearReference } from "src/app/shared/models/academicYearReference.model";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-add-semester",
  templateUrl: "./add-semester.component.html",
  styleUrls: ["./add-semester.component.scss"],
})
export class AddSemesterComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  createLoading: boolean = false;
  createNew = new FormGroup({
    semesterStartYear: new FormControl(null, Validators.required),
    semesterNumber: new FormControl(null, Validators.required),
    faculties: new FormControl(null, Validators.required),
  });

  years = [2021];
  semesters = [
    { id: 1, name: "Semester 1" },
    { id: 2, name: "Semester 2" },
  ];

  facultyDataRequest$ = this.facultyDAO.getAll().pipe(share());
  facultyStringify$ = this.facultyDataRequest$.pipe(
    map((items) => new Map(items.map((faculty: Faculty) => [faculty.id, faculty.facultyName] as [string, string]))),
    startWith(new Map()),
    map((map) => (id: string | TuiContextWithImplicit<string>) => typeof id == "string" ? map.get(id) : map.get(id.$implicit))
  );
  facultyItems$ = this.facultyDataRequest$.pipe(map((items) => items.map((item) => item.id)));
  facultyData: Faculty[] = [];
  all = "All";

  readonly content: TuiStringHandler<TuiValueContentContext<Faculty>> = ({ $implicit }) => $implicit.facultyName;

  constructor(
    private semesterDAO: SemesterDAOService,
    private facultyDAO: FacultyDAOService,
    private serverTimeService: ServerTimeService,
    private academicYearReferenceDAO: AcademicYearReferenceDaoService
  ) {
    this.serverTimeService
      .getServerTime()
      .subscribe((res) => {
        let currentYear = new Date(res).getFullYear();
        for (let i = 0; i < 10; i++) {
          this.years.push(currentYear + i);
        }
      })
      .unsubscribe();
  }

  ngOnInit(): void {
    this.facultyDataRequest$.subscribe((res) => {
      this.facultyData = res;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const dataCopy = Object.assign(this.createNew.value, {});
    const serverData: any = {
      semesterYear: `${dataCopy.semesterStartYear}/${+dataCopy.semesterStartYear + 1}`,
      semesterNumber: dataCopy.semesterNumber,
      faculties: dataCopy.faculties.map((facultyID: string) => {
        return { id: facultyID };
      }),
    };
    this.academicYearReferenceDAO.create(serverData).subscribe((res) => {
      this.openSidebar.emit(false);
      this.createLoading = false;
    });
  }

  @tuiPure
  stringify(semester: { id: number; name: string }[]): any {
    const map = new Map(semester.map(({ id, name }) => [id, name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || "";
  }
}
