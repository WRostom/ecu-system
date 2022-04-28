import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TUI_BUTTON_OPTIONS } from "@taiga-ui/core";
import { CalendarECLModule } from "src/app/shared/calendar/calendar.module";
import { CourseNameFromIDPipe } from "src/app/shared/pipes/course-name-from-id.pipe";
import { SharedModule } from "src/app/shared/shared.module";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { ManagementRoutingModule } from "./management-routing.module";
import { ManagementComponent } from "./management.component";
import { AddCourseComponent } from "./modules/courses/components/add-course/add-course.component";
import { AddGroupComponent } from "./modules/courses/components/course-display/components/add-group/add-group.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { AddDepartmentComponent } from "./modules/department/components/add-department/add-department.component";
import { ViewDepartmentComponent } from "./modules/department/components/view-department/view-department.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { AddFacultyComponent } from "./modules/faculty/components/add-faculty/add-faculty.component";
import { ViewFacultyComponent } from "./modules/faculty/components/view-faculty/view-faculty.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { AddMajorComponent } from "./modules/major/components/add-major/add-major.component";
import { ViewMajorComponent } from "./modules/major/components/view-major/view-major.component";
import { MajorComponent } from "./modules/major/major.component";
import { AddSemesterComponent } from "./modules/semester/components/add-semester/add-semester.component";
import { SemesterViewBlockComponent } from "./modules/semester/components/semester-view-block/semester-view-block.component";
import { AddCourseForSemesterComponent } from "./modules/semester/components/view-semester/components/add-course-for-semester/add-course-for-semester.component";
import { ViewSemesterComponent } from "./modules/semester/components/view-semester/view-semester.component";
import { SemesterComponent } from "./modules/semester/semester.component";
import { AddCourseToSemesterComponent } from './modules/semester/components/view-semester/components/add-course-to-semester/add-course-to-semester.component';

@NgModule({
  declarations: [
    ManagementComponent,
    DepartmentComponent,
    CoursesComponent,
    FacultyComponent,
    ComponentSectionDirective,
    MajorComponent,
    CourseDisplayComponent,
    AddGroupComponent,
    AddCourseComponent,
    AddMajorComponent,
    AddFacultyComponent,
    AddDepartmentComponent,
    ViewFacultyComponent,
    ViewMajorComponent,
    ViewDepartmentComponent,
    SemesterComponent,
    ViewSemesterComponent,
    SemesterViewBlockComponent,
    AddSemesterComponent,
    AddCourseForSemesterComponent,
    AddCourseToSemesterComponent,
  ],
  imports: [CommonModule, SharedModule, CalendarECLModule, ManagementRoutingModule],
  providers: [
    CourseNameFromIDPipe,
    {
      provide: TUI_BUTTON_OPTIONS,
      useValue: {
        appearance: "primary",
        size: "s",
      },
    },
  ],
  exports: [ManagementRoutingModule],
})
export class ManagementModule {}
