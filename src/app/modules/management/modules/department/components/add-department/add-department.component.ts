import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { DepartmentDAOService } from "src/app/core/api/department-dao.service";

@Component({
  selector: "app-add-department",
  templateUrl: "./add-department.component.html",
  styleUrls: ["./add-department.component.scss"],
})
export class AddDepartmentComponent implements OnInit {
  isEditMode: boolean = false;
  @Input("editMode") set editMode(data: string) {
    this.isEditMode = true;
    this.departmentDAO.getOne({ id: data }).subscribe((res) => {
      this.createNew.patchValue({
        id: res.id,
        departmentName: res.departName,
      });
    });
  }
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    departName: new FormControl("", Validators.required),
  });
  createLoading: boolean = false;
  constructor(private departmentDAO: DepartmentDAOService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    this.departmentDAO.create(this.createNew.value).subscribe((res) => {
      this.createLoading = false;
      this.openSidebar.emit(false);
    });
  }
}
