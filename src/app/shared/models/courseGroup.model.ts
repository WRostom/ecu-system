import { Course } from "./course.model";
import { Employee } from "./employee.model";

export class CourseGroup {
  id: string;
  course: Course;
  startTime: Date;
  endTime: Date;
  room: string;
  day: string;
  instructors: Employee[];
  maxNoStudents: number;

  constructor(
    id: string,
    startTime: Date,
    endTime: Date,
    room: string,
    day: string,
    course: Course,
    instructors: Employee[],
    maxNoStudents: number
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.day = day;
    this.maxNoStudents = maxNoStudents;
    this.course = course;
    this.instructors = instructors;
  }
}
