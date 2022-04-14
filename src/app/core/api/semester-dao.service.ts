import { Injectable } from "@angular/core";

import { Semester } from "src/app/shared/models/semester.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class SemesterDAOService extends GlobalDAOService<Semester> {
  constructor(api: ApiService) {
    super("semester", api);
  }
}
