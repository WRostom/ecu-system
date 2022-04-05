import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { EMPTY_ARRAY, TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiValueContentContext } from "@taiga-ui/core";
import { TuiCountryIsoCode } from "@taiga-ui/i18n";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { StudentDAOService } from "src/app/core/api/student-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.studentDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        facultyID: res.faculty.id,
        email: res.email,
        mobileNumber: res.mobileNumber,
      });
    });
  }
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    facultyID: new FormControl(null, Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    // countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl("", Validators.required),
  });
  readonly countries = Object.values(TuiCountryIsoCode);

  countryIsoCode = TuiCountryIsoCode.EG;
  createLoading: boolean = false;
  facultyDataRequest$ = this.facultyDAO.getAll();
  facultyData: Faculty[];

  constructor(private facultyDAO: FacultyDAOService, private studentDAO: StudentDAOService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.facultyDataRequest$.subscribe((faculty: Faculty[]) => {
      this.facultyData = faculty;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    serverData.faculty = this.facultyData.find((faculty) => faculty.id === this.createNew.value.facultyID);
    delete serverData.facultyID;

    if (this.isEditMode) {
      this.studentDAO.update(serverData).subscribe(() => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    } else {
      this.studentDAO.create(serverData).subscribe((res) => {
        this.openSidebar.emit(false);
        this.createLoading = false;
      });
    }
  }

  @tuiPure
  stringify(types: { id: string; facultyName: string }[]): any {
    const map = new Map(types.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<any>) => map.get($implicit) || "";
  }
}
