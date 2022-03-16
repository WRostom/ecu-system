import { Inject, Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class FacultyDAOService extends GlobalDAOService<any> {
  // tslint:disable: ban-types
  constructor(api: ApiService) {
    super("faculty", api);
  }
}
