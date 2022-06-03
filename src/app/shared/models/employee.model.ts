import { Department } from "./department.model";
import { Person, personType } from "./person.model";

export class Employee extends Person {
  id: string;
  department: Department;
  facultyId: string;

  constructor(
    firstName: string,
    lastName: string,
    type: personType,
    email: string,
    countryCode: string,
    mobileNumber: string,
    id: string,
    department: Department,
    facultyId?: string
  ) {
    super(firstName, lastName, type, email, countryCode, mobileNumber);
    this.id = id;
    this.department = department;
    this.facultyId = facultyId;
  }
}
