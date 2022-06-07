import { Injectable } from "@angular/core";

import { AcademicYearReference } from "src/app/shared/models/academicYearReference.model";

import { ApiService } from "./api.service";
import { GlobalDAOService } from "./global-dao.service";

@Injectable({
  providedIn: "root",
})
export class AcademicYearReferenceDaoService extends GlobalDAOService<AcademicYearReference> {
  constructor(api: ApiService) {
    super("academic-year-reference", api);
  }
}
