import { AfterViewInit, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, tuiPure } from "@taiga-ui/cdk";
import { FacultyDAOService } from "src/app/core/api/faculty-dao.service";
import { MajorDaoService } from "src/app/core/api/major-dao.service";
import { Faculty } from "src/app/shared/models/faculty.model";

@Component({
  selector: "app-add-major",
  templateUrl: "./add-major.component.html",
  styleUrls: ["./add-major.component.scss"],
})
export class AddMajorComponent implements OnInit, AfterViewInit {
  @Output() openSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  createLoading: boolean = false;
  createNew = new FormGroup({
    id: new FormControl("", Validators.required),
    majorName: new FormControl("", Validators.required),
    facultyID: new FormControl(null, Validators.required),
  });

  facultyDataRequest$ = this.facultyDAO.getAll();
  facultyData: Faculty[];

  faculty: Faculty[] = [
    {
      id: "1",
      facultyName: "Informatics and Computer Science",
    },
  ];
  constructor(private majorDAO: MajorDaoService, private facultyDAO: FacultyDAOService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.facultyDataRequest$.subscribe((faculty: Faculty[]) => {
      this.facultyData = faculty;
    });
  }

  onSubmit() {
    this.createLoading = true;
    const serverData = Object.assign(this.createNew.value, {});
    serverData.faculty = this.facultyData.find((faculty) => faculty.id === this.createNew.value.facultyID);
    delete serverData.facultyID;
    this.majorDAO.create(serverData).subscribe((res) => {
      this.openSidebar.emit(false);
      this.createLoading = false;
    });
  }

  @tuiPure
  stringify(faculty: { id: string; facultyName: string }[]): any {
    const map = new Map(faculty.map(({ id, facultyName }) => [id, facultyName] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
