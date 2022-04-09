import { CourseStudent } from "./courseStudent.model";
import { Faculty } from "./faculty.model";
import { Major } from "./major.model";

export class Course {
  id: string;
  courseName: string;
  credits: string;
  prerequisteList: string[];
  major: Major;
  faculty: Faculty;
  maxNoStudents: number;
  currentNoStudents: number;
  registrations?: CourseStudent[];

  constructor(
    id: string,
    courseName: string,
    credits: string,
    prerequisteList: string[],
    major: Major,
    faculty: Faculty,
    maxNoStudents: number,
    currentNoStudents: number,
    registrations?: CourseStudent[]
  ) {
    this.id = id;
    this.courseName = courseName;
    this.credits = credits;
    this.prerequisteList = prerequisteList;
    this.major = major;
    this.faculty = faculty;
    this.maxNoStudents = maxNoStudents;
    this.currentNoStudents = currentNoStudents;
    this.registrations = registrations;
  }
}
