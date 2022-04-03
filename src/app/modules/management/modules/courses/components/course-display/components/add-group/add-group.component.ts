import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TuiContextWithImplicit, TuiDay, tuiPure, TuiTime } from "@taiga-ui/cdk";
import { tuiCreateTimePeriods } from "@taiga-ui/kit";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent implements OnInit {
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  identifier = { groupID: 1, color: "#ff00ff" };
  @Input("groupID") set groupIdentifier(data: any) {
    this.identifier.groupID = data;
  }
  createNew = new FormGroup({
    startDate: new FormControl(new TuiDay(2022, 4, 3), Validators.required),
    startTime: new FormControl(new TuiTime(2, 44), Validators.required),
    instructor: new FormControl(1, Validators.required),
  });
  createLoading: boolean = false;
  timeItems = tuiCreateTimePeriods();

  instructor: any[] = [
    {
      id: 1,
      name: "Waleed Rostom",
    },
    {
      id: 2,
      name: "Abdelrahman Amr",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.createLoading = true;
    setTimeout(() => {
      this.createLoading = false;
      this.openSidebar.emit({ ...this.identifier, ...this.createNew.value });
    }, 3000);
  }

  @tuiPure
  stringify(instructor: { id: string; name: string }[]): any {
    const map = new Map(instructor.map(({ id, name }) => [id, name] as [string, string]));

    return ({ $implicit }: TuiContextWithImplicit<string>) => map.get($implicit) || "";
  }
}
