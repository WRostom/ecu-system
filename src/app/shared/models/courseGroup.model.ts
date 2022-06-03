import { Course } from "./course.model";
import { Employee } from "./employee.model";

export class CourseGroup {
  id: string;
  name: string;
  course: Course;
  instructors: Employee[];
  maxNoStudents: number;
  currentNumberStudents: number;

  constructor(id: string, name: string, course: Course, instructors: Employee[], maxNoStudents: number, currentNumberStudents: number) {
    this.id = id;
    this.name = name;
    this.maxNoStudents = maxNoStudents;
    this.course = course;
    this.instructors = instructors;
    this.currentNumberStudents = currentNumberStudents;
  }
}
