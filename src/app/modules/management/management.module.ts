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
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiTabsModule } from "@taiga-ui/kit";
import { TuiInputModule } from "@taiga-ui/kit";
import { TuiDataListWrapperModule, TuiSelectModule } from "@taiga-ui/kit";
import { TuiInputCountModule } from "@taiga-ui/kit";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { ManagementRoutingModule } from "./management-routing.module";
import { ManagementComponent } from "./management.component";
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
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    TuiBreadcrumbsModule,
    TuiTabsModule,
    TuiTableModule,
    TuiInputModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLabelModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputCountModule,
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
    TuiBreadcrumbsModule,
    ComponentSectionDirective,
    FormsModule,
    ReactiveFormsModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLabelModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputCountModule,
  ],
})
export class ManagementModule {}
