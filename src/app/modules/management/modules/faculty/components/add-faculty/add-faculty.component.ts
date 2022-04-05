import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";

@Component({
  selector: "app-add-faculty",
  templateUrl: "./add-faculty.component.html",
  styleUrls: ["./add-faculty.component.scss"],
})
export class AddFacultyComponent implements OnInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.facultyDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        id: res.id,
        facultyName: res.facultyName,
      });
    });
  }
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
    if (this.isEditMode) {
      this.facultyDAO.update(this.createNew.value).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    } else {
      this.facultyDAO.create(this.createNew.value).subscribe((res) => {
        this.createLoading = false;
        this.openSidebar.emit(false);
      });
    }
  }
}
