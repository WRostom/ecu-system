import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TUI_BUTTON_OPTIONS } from "@taiga-ui/core";
import { CalendarECLModule } from "src/app/shared/calendar/calendar.module";
import { SharedModule } from "src/app/shared/shared.module";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { ManagementRoutingModule } from "./management-routing.module";
import { ManagementComponent } from "./management.component";
import { AddCourseComponent } from "./modules/courses/components/add-course/add-course.component";
import { AddGroupComponent } from "./modules/courses/components/course-display/components/add-group/add-group.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { MajorComponent } from "./modules/major/major.component";
import { AddMajorComponent } from './modules/major/components/add-major/add-major.component';
import { AddFacultyComponent } from './modules/faculty/components/add-faculty/add-faculty.component';

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
  ],
  imports: [CommonModule, SharedModule, CalendarECLModule, ManagementRoutingModule],
  providers: [
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
