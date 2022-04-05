import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, of } from "rxjs";
import { MajorDaoService } from "src/app/core/api/major-dao.service";
import { Major } from "src/app/shared/models/major.model";

@Component({
  selector: "app-view-major",
  templateUrl: "./view-major.component.html",
  styleUrls: ["./view-major.component.scss"],
})
export class ViewMajorComponent implements OnInit {
  majorDataRequest$: Observable<Major>;
  loading$: any = of(true);
  openEdit: boolean;
  pageID: string;
  constructor(private majorDAO: MajorDaoService, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      if (val && val["id"]) {
        this.pageID = val["id"];
        this.majorDataRequest$ = this.majorDAO.getOne({ id: val["id"] });
        this.loading$ = this.majorDataRequest$.pipe(map((value) => !value));
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  toggleEdit(open: boolean, refresh?: boolean) {
    this.openEdit = open;
    if (refresh) {
      this.majorDataRequest$ = this.majorDAO.getOne({ id: this.pageID });
    }
  }
}
