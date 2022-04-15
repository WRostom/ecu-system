import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-semester",
  templateUrl: "./semester.component.html",
  styleUrls: ["./semester.component.scss"],
})
export class SemesterComponent implements OnInit {
  showPrevHistory: boolean = false;
  open = false;
  constructor() {}

  ngOnInit(): void {}

  toggle(open: boolean, refresh?: boolean) {
    this.open = open;

    if (refresh) {
      // this.majorDataRequest$ = this.majorDAO.getAll();
    }
  }
}
