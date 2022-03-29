import { Location } from "@angular/common";
import { Component, Directive, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Route, Router } from "@angular/router";

import { ComponentSectionDirective } from "./directive/component-section.directive";
import { CoursesComponent } from "./modules/courses/courses.component";
import { DepartmentComponent } from "./modules/department/department.component";
import { FacultyComponent } from "./modules/faculty/faculty.component";
import { MajorComponent } from "./modules/major/major.component";

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"],
})
export class ManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
