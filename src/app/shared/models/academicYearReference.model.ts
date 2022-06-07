import { Faculty } from "./faculty.model";

export class AcademicYearReference {
  id: string;
  semesterYear: string;
  semesterNumber: number;
  faculties: Faculty[];

  constructor(id: string, semesterYear: string, semesterNumber: number, faculties: Faculty[]) {
    this.id = id;
    this.semesterYear = semesterYear;
    this.semesterNumber = semesterNumber;
    this.faculties = faculties;
  }
}
