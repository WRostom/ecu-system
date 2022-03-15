import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { TUI_BUTTON_OPTIONS } from "@taiga-ui/core";
import { TuiBreadcrumbsModule } from "@taiga-ui/kit";
import { TuiTabsModule } from "@taiga-ui/kit";
import { TuiInputModule } from "@taiga-ui/kit";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { ManagementRoutingModule } from "./management-routing.module";
import { ManagementComponent } from "./management.component";
import { CoursesComponent } from "./modules/courses/courses.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { MajorComponent } from "./modules/major/major.component";

@NgModule({
  declarations: [ManagementComponent, DepartmentComponent, CoursesComponent, FacultyComponent, ComponentSectionDirective, MajorComponent],
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
  exports: [TuiBreadcrumbsModule, ComponentSectionDirective],
})
export class ManagementModule {}
