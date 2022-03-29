import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ManagementComponent } from "./management.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
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
        path: "courses/:id",
        component: CourseDisplayComponent,
      },
      {
        path: "faculty",
        component: FacultyComponent,
      },
      {
        path: "major",
        component: MajorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
