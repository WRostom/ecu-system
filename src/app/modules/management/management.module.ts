import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TuiSidebarModule } from "@taiga-ui/addon-mobile";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiActiveZoneModule } from "@taiga-ui/cdk";
import { TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { TUI_BUTTON_OPTIONS } from "@taiga-ui/core";
import { TuiLabelModule } from "@taiga-ui/core";
import { TuiDataListModule } from "@taiga-ui/core";
import { TuiBreadcrumbsModule, TuiInputTimeModule } from "@taiga-ui/kit";
import { TuiTabsModule } from "@taiga-ui/kit";
import { TuiInputModule } from "@taiga-ui/kit";
import { TuiDataListWrapperModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiInputCountModule } from "@taiga-ui/kit";
import { TuiInputDateModule } from "@taiga-ui/kit";
import { CalendarECLModule } from "src/app/shared/calendar/calendar.module";
import { SharedModule } from "src/app/shared/shared.module";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { ManagementRoutingModule } from "./management-routing.module";
import { ManagementComponent } from "./management.component";
import { AddGroupComponent } from "./modules/courses/components/course-display/components/add-group/add-group.component";
import { CourseDisplayComponent } from "./modules/courses/components/course-display/course-display.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { MajorComponent } from "./modules/major/major.component";

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
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarECLModule,
    ManagementRoutingModule,
  
  ],
  providers: [
    {
      provide: TUI_BUTTON_OPTIONS,
      useValue: {
        appearance: "primary",
        size: "s",
      },
    },
  ],
  exports: [
    ManagementRoutingModule,
    
  ],
})
export class ManagementModule {}
