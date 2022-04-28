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

  getSemestersByFacultyId(facultyId: string) {
    let faculty: Partial<Faculty> = { id: facultyId };
    return this.api.postRequest<Semester[]>(`${this.pageName}/getSemestersByFacultyId`, { faculty });
  }

  getSemestersByFacultyIdAndYear(id: { semesterYear: string; semesterNumber: number }, facultyId: string) {
    let faculty: Partial<Faculty> = { id: facultyId };
    return this.api.postRequest<Semester[]>(`${this.pageName}/getSemestersByFacultyIdAndYear`, { id, faculty });
  }
}

export interface createSemesterToAllFacultiesRequest {
  semesterYear: string;
  semesterNumber: number;
  facultiesArray: Partial<Faculty>[];
}
