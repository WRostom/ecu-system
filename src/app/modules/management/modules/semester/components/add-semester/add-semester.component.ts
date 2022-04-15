import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { SemesterDAOService } from "src/app/core/api/semester-dao.service";

@Component({
  selector: "app-add-semester",
  templateUrl: "./add-semester.component.html",
  styleUrls: ["./add-semester.component.scss"],
})
export class AddSemesterComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  createLoading: boolean = false;
  isEditMode: boolean = false;
  createNew = new FormGroup({
    semesterStartYear: new FormControl(null, Validators.required),
    semesterNumber: new FormControl(null, Validators.required),
  });

  years = [2022, 2023, 2024, 2025];
  semesters = [
    { id: 1, name: "Semester 1" },
    { id: 2, name: "Semester 2" },
  ];

  constructor(private semesterDAO: SemesterDAOService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    const dataCopy = Object.assign(this.createNew.value, {});
    const serverData = {
      id: {
        semesterYear: `${dataCopy.semesterStartYear}/${+dataCopy.semesterStartYear + 1}`,
        semesterNumber: dataCopy.semesterNumber,
      },
    };
    if (this.isEditMode) {
      // this.semesterDAO.update(serverData).subscribe(() => {
      this.createLoading = false;
      this.openSidebar.emit(false);
      // });
    } else {
      // this.semesterDAO.create(serverData).subscribe((res) => {
      this.openSidebar.emit(false);
      this.createLoading = false;
      // });
    }
  }

  @tuiPure
  stringify(faculty: { id: number; name: string }[]): any {
    const map = new Map(faculty.map(({ id, name }) => [id, name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || "";
  }
}
