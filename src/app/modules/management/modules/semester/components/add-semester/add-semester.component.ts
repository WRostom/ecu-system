import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-semester",
  templateUrl: "./add-semester.component.html",
  styleUrls: ["./add-semester.component.scss"],
})
export class AddSemesterComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  createLoading: boolean = false;
  isEditMode: boolean = false;
  createNew = new FormGroup({
    semesterStartYear: new FormControl(null, Validators.required),
    semesterEndYear: new FormControl(""),
    semesterNumber: new FormControl(null, Validators.required),
  });

  years = [2022, 2023, 2024, 2025];
  semesters = ["Semester 1", "Semester 2"];

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}
