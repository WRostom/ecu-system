import { Faculty } from "./faculty.model";
import { Major } from "./major.model";

export class Semester {
  id: string;
  offeredCourses: string[];
  faculty: Faculty;
  major: Major;

  constructor(id: string, offeredCourses: string[], faculty: Faculty, major: Major) {
    this.id = id;
    this.offeredCourses = offeredCourses;
    this.faculty = faculty;
    this.major = major;
  }
}
