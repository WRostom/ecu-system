import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-add-major",
  templateUrl: "./add-major.component.html",
  styleUrls: ["./add-major.component.scss"],
})
export class AddMajorComponent implements OnInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  createLoading: boolean = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    majorName: new FormControl("", Validators.required),
    facultyID: new FormControl("1", Validators.required),
  });

  faculty: Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.openSidebar.emit(false);
      this.createLoading = false;
    }, 3000);
  }

  @tuiPure
  stringify(faculty: { id: string; facultyName: string }[]): any {
    const map = new Map(faculty.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
