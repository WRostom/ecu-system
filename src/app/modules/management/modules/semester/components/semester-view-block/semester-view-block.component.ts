import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-semester-view-block",
  templateUrl: "./semester-view-block.component.html",
  styleUrls: ["./semester-view-block.component.scss"],
})
export class SemesterViewBlockComponent implements OnInit {
  @Input("flag") flag: string;
  constructor() {}

  ngOnInit(): void {}
}
