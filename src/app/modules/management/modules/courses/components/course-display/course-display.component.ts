import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CoursesDaoService } from "src/app/core/api/courses-dao.service";

@Component({
  selector: "app-course-display",
  templateUrl: "./course-display.component.html",
  styleUrls: ["./course-display.component.scss"],
})
export class CourseDisplayComponent implements OnInit {
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private courseDAO: CoursesDaoService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.getCourseData(val["id"]);
      } else {
        this.goBack();
      }
    });
  }

  getCourseData(id: string) {
    this.courseDAO.getOne(id).subscribe((res) => {
      console.log(res, "data");
    });
  }

  goBack() {
    this.location.back();
  }
}
