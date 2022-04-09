import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ManagementComponent } from "./management.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { ViewDepartmentComponent } from "./modules/department/components/view-department/view-department.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { ViewFacultyComponent } from "./modules/faculty/components/view-faculty/view-faculty.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { ViewMajorComponent } from "./modules/major/components/view-major/view-major.component";
import { MajorComponent } from "./modules/major/major.component";

const routes: Routes = [
  // { path: "", redirectTo: "faculty", pathMatch: "full" },
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: "courses",
        component: CoursesComponent,
      },
      {
        path: "faculty",
        component: FacultyComponent,
      },
      {
        path: "faculty/:id",
        component: ViewFacultyComponent,
      },
      {
        path: "major",
        component: MajorComponent,
      },
      {
        path: "major/:id",
        component: ViewMajorComponent,
      },
      {
        path: "department",
        component: DepartmentComponent,
      },
      {
        path: "department/:id",
        component: ViewDepartmentComponent,
      },
    ],
  },
  {
    path: "courses/:id",
    component: CourseDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
