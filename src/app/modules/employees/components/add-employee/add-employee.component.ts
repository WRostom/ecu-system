import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";

import { TuiCountryIsoCode } from "@taiga-ui/i18n";
import { personType } from "src/app/shared/models/person.model";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  createNew = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    // will add drop down for later 
    type: new FormControl(personType.DOCTOR,Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    // countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl("", Validators.required),
  });
  readonly countries = Object.values(TuiCountryIsoCode);

  countryIsoCode = TuiCountryIsoCode.EG;

  createLoading: boolean = false;
  types = [{
    id: personType.DOCTOR,
    name: 'Doctor',
  },
  {
    id: personType.EMPLOYEE,
    name: 'Employee',
  }
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
  stringify(types:  { id: personType; name: string }[]): any {
    const map = new Map(types.map(({ id, name }) => [id, name] as [personType, string]));

    return ({ $implicit }: TuiContextWithImplicit<any>) => map.get($implicit) || "";
  }
}
