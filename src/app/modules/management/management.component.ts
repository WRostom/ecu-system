import { Location } from "@angular/common";
import { Component, Directive, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

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
  private sections: any = {
    department: DepartmentComponent,
    courses: CoursesComponent,
    faculty: FacultyComponent,
    major: MajorComponent,
  };
  @ViewChild(ComponentSectionDirective, { static: true }) componentHost!: ComponentSectionDirective;
  constructor(private location: Location, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe((val) => {
      this.loadComponent(val["section"]);
    });
  }

  changeComponent(url: string) {
    this.location.replaceState(`management/${url}`);
    this.loadComponent(url);
  }

  loadComponent(componentName: string) {
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<any>(this.sections[componentName]);
  }
}
