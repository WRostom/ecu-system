import { Course } from "./course.model";
import { CourseGroup } from "./courseGroup.model";
import { Employee } from "./employee.model";

export class CourseGroupSlot {
  id: string;
  courseGroup: CourseGroup;
  startTime: Date;
  endTime: Date;
  room: string;
  day: string;

  constructor(id: string, startTime: Date, endTime: Date, room: string, day: string, courseGroup: CourseGroup) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.day = day;
    this.courseGroup = courseGroup;
  }
}
