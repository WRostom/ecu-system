import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewEmployeeComponent } from "./components/view-employee/view-employee.component";
import { EmployeesComponent } from "./employees.component";

const routes: Routes = [
  { path: "", component: EmployeesComponent },
  { path: ":id", component: ViewEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
