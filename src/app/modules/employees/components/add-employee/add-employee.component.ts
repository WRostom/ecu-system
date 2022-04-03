import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiCountryIsoCode } from "@taiga-ui/i18n";

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
    // type: personType;
    email: new FormControl("", [Validators.required, Validators.email]),
    // countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl("", Validators.required),
  });
  readonly countries = Object.values(TuiCountryIsoCode);

  countryIsoCode = TuiCountryIsoCode.EG;

  createLoading: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.createLoading = false;
      this.openSidebar.emit(this.createNew.value);
    }, 3000);
  }
}
