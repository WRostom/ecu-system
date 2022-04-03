import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.scss"],
})
export class ViewStudentComponent implements OnInit {
  open: any;
  constructor() {}

  ngOnInit(): void {}
  toggle(open: any) {
    this.open = open;
  }
  editStudent(student: any) {
    // this.student = [...this.student, student];
    this.toggle(false);
  }
}
