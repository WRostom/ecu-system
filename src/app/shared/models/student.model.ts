import { CourseStudent } from "./courseStudent.model";
import { Department } from "./department.model";
import { Faculty } from "./faculty.model";
import { Person, personType } from "./person.model";

export class Student extends Person {
  id: string;
  faculty: Faculty;
  registrations: CourseStudent[];

  constructor(
    firstName: string,
    lastName: string,
    type: personType,
    email: string,
    countryCode: string,
    mobileNumber: string,
    id: string,
    faculty: Faculty,
    registrations: CourseStudent[]
  ) {
    super(firstName, lastName, type, email, countryCode, mobileNumber);
    this.id = id;
    this.faculty = faculty;
    this.registrations = registrations;
  }
}
