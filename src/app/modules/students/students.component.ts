import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
 searchTerm!: string;
  columns = ["fullName", "mobile", "email", "faculty", "courses"];
  open = false;
  student: any[] = [
    {
      firstName: "Ahmed",
      lastName: "Hisham",
      mobileNumber: "+201100781855",
      email: "localhosta@localhost.com",
      faculty: "CS",
      courses: ["C1","C2"],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }
 toggle(open: any) {
    this.open = open;
  }
    addStudent(student: any) {
    this.student = [...this.student, student];
    this.toggle(false);
  }

}
