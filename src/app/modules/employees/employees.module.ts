import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";

import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { EmployeesComponent } from "./employees.component";

@NgModule({
  declarations: [EmployeesComponent, AddEmployeeComponent],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
})
export class EmployeesModule {}
