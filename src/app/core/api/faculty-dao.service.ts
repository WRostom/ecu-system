import { Inject, Injectable } from "@angular/core";

import { Faculty } from "src/app/shared/models/faculty.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class FacultyDAOService extends GlobalDAOService<Faculty> {
  constructor(api: ApiService) {
    super("faculty", api);
  }
}
