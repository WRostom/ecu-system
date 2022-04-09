import { Course } from "./course.model";
import { Employee } from "./employee.model";

export class CourseGroup {
  id: string;
  maxNoStudent: number;
  course: Course;
  startTime: Date;
  endTime: Date;
  room: string;
  day: string;
  instructors: Employee[];

  constructor(
    id: string,
    startTime: Date,
    endTime: Date,
    room: string,
    day: string,
    maxNoStudent: number,
    course: Course,
    instructors: Employee[]
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.day = day;
    this.maxNoStudent = maxNoStudent;
    this.course = course;
    this.instructors = instructors;
  }
}
