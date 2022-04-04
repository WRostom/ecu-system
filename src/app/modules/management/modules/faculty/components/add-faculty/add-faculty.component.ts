import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-faculty",
  templateUrl: "./add-faculty.component.html",
  styleUrls: ["./add-faculty.component.scss"],
})
export class AddFacultyComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    facultyName: new FormControl("", Validators.required),
  });
  createLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.openSidebar.emit(false);
      this.createLoading = false;
    }, 3000);
  }
}
