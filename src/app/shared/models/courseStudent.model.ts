import { Course } from "./course.model";
import { Student } from "./student.model";

export class CourseStudent {
  id: string;
  student: Student;
  course: Course;
  registeredAt: Date;
  grade: string;

  constructor(id: string, student: Student, course: Course, registeredAt: Date, grade: string) {
    this.id = id;
    this.student = student;
    this.course = course;
    this.registeredAt = registeredAt;
    this.grade = grade;
  }
}
