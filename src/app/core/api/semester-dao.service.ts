import { Injectable } from "@angular/core";

import { Faculty } from "src/app/shared/models/faculty.model";
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

  createSemesterToAllFaculties(data: createSemesterToAllFacultiesRequest) {
    return this.api.postRequest<Semester>(`${this.pageName}/createSemesterToAllFaculties`, data);
  }
}

export interface createSemesterToAllFacultiesRequest {
  semesterYear: string;
  semesterNumber: number;
  facultiesArray: Partial<Faculty>[];
}
