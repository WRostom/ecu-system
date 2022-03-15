import { Course } from "./course.model";
import { Employee } from "./employee.model";

export class CourseGroup {
  id: string;
  timeSlot: Date;
  room: string;
  maxNoStudent: number;
  course: Course;
  instructors: Employee[];

  constructor(id: string, timeSlot: Date, room: string, maxNoStudent: number, course: Course, instructors: Employee[]) {
    this.id = id;
    this.timeSlot = timeSlot;
    this.room = room;
    this.maxNoStudent = maxNoStudent;
    this.course = course;
    this.instructors = instructors;
  }
}
