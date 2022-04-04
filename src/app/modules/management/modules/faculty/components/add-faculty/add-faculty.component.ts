import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";

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

  constructor(private facultyDAO: FacultyDAOService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    this.facultyDAO.create(this.createNew.value).subscribe((res) => {
      this.createLoading = false;
      this.openSidebar.emit(false);
    });
  }
}
