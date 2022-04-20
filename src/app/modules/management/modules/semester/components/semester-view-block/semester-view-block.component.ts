import { Component, Input, OnInit } from "@angular/core";

import { fullYearView } from "../../semester.component";

@Component({
  selector: "app-semester-view-block",
  templateUrl: "./semester-view-block.component.html",
  styleUrls: ["./semester-view-block.component.scss"],
})
export class SemesterViewBlockComponent implements OnInit {
  @Input("flag") flag: string;
  @Input("data") fullYear: fullYearView;
  constructor() {}

  ngOnInit(): void {}

  formatYearToDashes(year: string): string {
    return year.split("/").join(".");
  }
}
