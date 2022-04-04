import { Injectable } from "@angular/core";

import { Student } from "src/app/shared/models/student.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class StudentDAOService extends GlobalDAOService<Student> {
  constructor(api: ApiService) {
    super("student", api);
  }
}
