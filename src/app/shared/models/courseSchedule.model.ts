import { CourseGroup } from "./courseGroup.model";

export class CourseSchedule {
  id: string;
  timeSlot: Date;
  room: string;
  courseGroup: CourseGroup;

  constructor(id: string, timeSlot: Date, room: string, courseGroup: CourseGroup) {
    this.id = id;
    this.timeSlot = timeSlot;
    this.room = room;
    this.courseGroup = courseGroup;
  }
}
