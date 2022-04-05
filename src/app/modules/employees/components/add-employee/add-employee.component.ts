import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { TuiCountryIsoCode } from "@taiga-ui/i18n";
import { DepartmentDAOService } from "src/app/core/api/department-dao.service";
import { EmployeeDAOService } from "src/app/core/api/employee-dao.service";
import { Department } from "src/app/shared/models/department.model";
import { personType } from "src/app/shared/models/person.model";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.employeeDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        id: res.id,
        firstName: res.firstName,
        lastName: res.lastName,
        type: personType[res.type],
        email: res.email,
        mobileNumber: res.mobileNumber,
        departmentID: res.department.id,
      });
    });
  }
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    type: new FormControl(personType.DOCTOR, Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    // countryCode: new FormControl('', Validators.required),
    mobileNumber: new FormControl("", Validators.required),
    departmentID: new FormControl(null, Validators.required),
  });
  readonly countries = Object.values(TuiCountryIsoCode);

  countryIsoCode = TuiCountryIsoCode.EG;

  createLoading: boolean = false;
  types = [
    {
      id: personType.DOCTOR,
      name: "Doctor",
    },
    {
      id: personType.EMPLOYEE,
      name: "Employee",
    },
  ];

  departmentDataRequest$ = this.departmentDAO.getAll();
  departmentData: Department[];

  constructor(private employeeDAO: EmployeeDAOService, private departmentDAO: DepartmentDAOService) {}

  ngOnInit(): void {
    this.departmentDataRequest$.subscribe((faculty: Department[]) => {
      this.departmentData = faculty;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    serverData.department = this.departmentData.find((department) => department.id === this.createNew.value.departmentID);
    delete serverData.departmentID;

    if (this.isEditMode) {
      this.employeeDAO.update(serverData).subscribe(() => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    } else {
      this.employeeDAO.create(serverData).subscribe((res) => {
        this.openSidebar.emit(false);
        this.createLoading = false;
      });
    }
  }
  @tuiPure
  stringify(types: { id: personType; name: string }[]): any {
    const map = new Map(types.map(({ id, name }) => [id, name] as [personType, string]));

    return ({ $implicit }: TuiContextWithImplicit<any>) => map.get($implicit) || "";
  }

  @tuiPure
  stringifyDept(department: any[]): any {
    const map = new Map(department.map(({ id, departName }) => [id, departName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
