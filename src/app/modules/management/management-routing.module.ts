import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ManagementComponent } from "./management.component";
import { ViewGroupComponent } from "./modules/courses/components/course-display/components/view-group/view-group.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { ViewDepartmentComponent } from "./modules/department/components/view-department/view-department.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { ViewFacultyComponent } from "./modules/faculty/components/view-faculty/view-faculty.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { ViewMajorComponent } from "./modules/major/components/view-major/view-major.component";
import { MajorComponent } from "./modules/major/major.component";
import { AddCourseForSemesterComponent } from "./modules/semester/components/view-semester/components/add-course-for-semester/add-course-for-semester.component";
import { ViewSemesterComponent } from "./modules/semester/components/view-semester/view-semester.component";
import { SemesterComponent } from "./modules/semester/semester.component";

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
        path: "major",
        component: MajorComponent,
      },

      {
        path: "department",
        component: DepartmentComponent,
      },
      {
        path: "semester",
        component: SemesterComponent,
      },
    ],
  },
  {
    path: "courses/:id",
    component: CourseDisplayComponent,
  },
  {
    path: "courses/:id/:groupid",
    component: ViewGroupComponent,
  },
  {
    path: "department/:id",
    component: ViewDepartmentComponent,
  },
  {
    path: "major/:id",
    component: ViewMajorComponent,
  },
  {
    path: "faculty/:id",
    component: ViewFacultyComponent,
  },
  {
    path: "semester/:id",
    component: ViewSemesterComponent,
    children: [
      {
        path: ":faculty",
        component: AddCourseForSemesterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
