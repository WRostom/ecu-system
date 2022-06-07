import { slotTypes } from "src/app/shared/models/courseGroupSlots";

export enum dayOfTheWeek {
  SUNDAY = "SU",
  MONDAY = "MO",
  TUESDAY = "TU",
  WEDNESDAY = "WE",
  THURSDAY = "TH",
  FRIDAY = "FR",
  SATURDAY = "SA",
}

export enum dayOfTheWeekNumberEquivalent {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export const daysOfWeek = Object.keys(dayOfTheWeek);

export const slotTypeList = Object.keys(slotTypes);
