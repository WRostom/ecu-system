import { Injectable } from "@angular/core";

import { Employee } from "src/app/shared/models/employee.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeDAOService extends GlobalDAOService<Employee> {
  constructor(api: ApiService) {
    super("employee", api);
  }
}
