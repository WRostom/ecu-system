import { Injectable } from "@angular/core";

import { Major } from "src/app/shared/models/major.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class MajorDaoService extends GlobalDAOService<Major> {
  constructor(api: ApiService) {
    super("major", api);
  }
}
