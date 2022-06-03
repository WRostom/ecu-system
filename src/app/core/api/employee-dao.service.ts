import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Employee } from "src/app/shared/models/employee.model";
import { personType } from "src/app/shared/models/person.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeDAOService extends GlobalDAOService<Employee> {
  constructor(api: ApiService) {
    super("employee", api);
  }

  getEmpBasedTypeAndFaculty(facultyId: string, type: personType): Observable<Employee[]> {
    return this.api.postRequest<Employee[]>(`${this.pageName}/getEmpBasedTypeAndFaculty`, { facultyId, type });
  }
}
