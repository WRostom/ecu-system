import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "management", loadChildren: () => import("./modules/management/management.module").then((m) => m.ManagementModule) },
  { path: 'employees', loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'students', loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
