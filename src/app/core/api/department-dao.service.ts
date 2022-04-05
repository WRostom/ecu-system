import { Injectable } from "@angular/core";

import { Department } from "src/app/shared/models/department.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class DepartmentDAOService extends GlobalDAOService<Department> {
  constructor(api: ApiService) {
    super("department", api);
  }
}
