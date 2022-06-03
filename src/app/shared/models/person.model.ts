export class Person {
  firstName: string;
  lastName: string;
  type: personType;
  email: string;
  countryCode: string;
  mobileNumber: string;

  constructor(firstName: string, lastName: string, type: personType, email: string, countryCode: string, mobileNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
    this.email = email;
    this.countryCode = countryCode;
    this.mobileNumber = mobileNumber;
  }
}

export enum personTypeString {
  STUDENT = "STUDENT",
  DOCTOR = "DOCTOR",
  EMPLOYEE = "EMPLOYEE",
  TEACHER_ASSISTANT = "TEACHER_ASSISTANT",
  PROCTORS = "PROCTORS",
  SUPERVISOR = "SUPERVISOR",
}
export enum personType {
  STUDENT = "STUDENT",
  DOCTOR = "DOCTOR",
  EMPLOYEE = "EMPLOYEE",
  TEACHER_ASSISTANT = "TEACHER_ASSISTANT",
  PROCTORS = "PROCTORS",
  SUPERVISOR = "SUPERVISOR",
}
