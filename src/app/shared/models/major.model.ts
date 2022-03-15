import { Faculty } from "./faculty.model";

export class Major {
  id: string;
  majorName: string;
  faculty: Faculty;

  constructor(id: string, majorName: string, faculty: Faculty) {
    this.id = id;
    this.majorName = majorName;
    this.faculty = faculty;
  }
}
