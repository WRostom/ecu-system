import { CourseGroup } from "./courseGroup.model";

export class CourseGroupSlot {
  id: string;
  courseGroup: CourseGroup;
  startTime: Date;
  endTime: Date;
  room: string;
  day: string;
  slotType: slotTypes;

  constructor(id: string, startTime: Date, endTime: Date, room: string, day: string, courseGroup: CourseGroup, slotType: slotTypes) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.day = day;
    this.courseGroup = courseGroup;
    this.slotType = slotType;
  }
}

export enum slotTypes {
  LECTURE = "LECTURE",
  LAB = "LAB",
}
