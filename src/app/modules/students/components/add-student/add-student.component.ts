import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMPTY_ARRAY, TuiContextWithImplicit, tuiPure, TuiStringHandler } from "@taiga-ui/cdk";
import { TuiValueContentContext } from "@taiga-ui/core";
import { TuiCountryIsoCode } from "@taiga-ui/i18n";
import { Faculty } from "src/app/shared/models/faculty.model";
@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  createNew = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    // will add drop down for later
    faculty: new FormControl("1", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    // countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl("", Validators.required),
  });
  readonly countries = Object.values(TuiCountryIsoCode);

  countryIsoCode = TuiCountryIsoCode.EG;
  createLoading: boolean = false;

  faculty = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
    {
      id: "2",
      facultyName: "Software Engineer",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.createLoading = false;
      this.openSidebar.emit(this.createNew.value);
    }, 3000);
  }

  @tuiPure
  stringify(types: { id: string; facultyName: string }[]): any {
    const map = new Map(types.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<any>) => map.get($implicit) || "";
  }
  readonly content: TuiStringHandler<TuiValueContentContext<ReadonlyArray<unknown>>> = ({ $implicit: { length } }) =>
    length ? `${length} accounts` : "All";
}
