import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewStudentComponent } from "./components/view-student/view-student.component";
import { StudentsComponent } from "./students.component";

const routes: Routes = [
  { path: "", component: StudentsComponent },
  {
    path: ":id",
    component: ViewStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
