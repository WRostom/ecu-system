import { Faculty } from "./faculty.model";
import { Major } from "./major.model";

export class Semester {
  id: { semesterYear: string; semesterNumber: number };
  offeredCourses?: string[];
  faculty?: Faculty;
  major?: Major;

  constructor(id: { semesterYear: string; semesterNumber: number }, offeredCourses: string[], faculty: Faculty, major: Major) {
    this.id = id;
    this.offeredCourses = offeredCourses;
    this.faculty = faculty;
    this.major = major;
  }
}
